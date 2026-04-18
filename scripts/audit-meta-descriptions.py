#!/usr/bin/env python3
"""Audit meta descriptions — longueur affichée SERP (suffixe auteur si appendAuthorSuffix)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"
CONTENT_GEN = ROOT / "content" / "generated"
CONTENT_BLOG = ROOT / "content" / "blog"

AUTHOR_SUFFIX = "Laure Olivié, formatrice IA BTP"


def with_og_suffix(d: str) -> str:
    d = d.strip()
    if AUTHOR_SUFFIX in d:
        return d
    sep = " " if d.endswith(".") else ". "
    return f"{d}{sep}{AUTHOR_SUFFIX}."


# Résolu comme en runtime (fr-FR) — aligné lib/constants + lib/seo SITE_CONFIG.description
SITE_CONFIG_DESCRIPTION = (
    "Expert en formation IA pour le BTP : intelligence artificielle bâtiment et travaux publics, "
    "ChatGPT BTP pour artisans et conducteurs de travaux. Devis, appels d'offres, chantier — gain de temps, "
    "automatisation, productivité. Qualiopi, OPCO Constructys. Laure Olivié — +1 592 pros formés, note 4,85/5. "
    "Île-de-France & France."
)


def status_for(n: int) -> str:
    if n < 120:
        return "🔴 TROP COURTE"
    if n > 155:
        return "❌ TROP LONGUE"
    if n >= 150:
        return "⚠️ LIMITE"
    return "✅ OK"


def parse_string_at(s: str, i: int) -> tuple[str | None, int]:
    """Lit une chaîne TS/JS à partir de s[i] (' ou \" ou `). Retourne (contenu, index après)."""
    if i >= len(s):
        return None, i
    q = s[i]
    if q not in "'\"`":
        return None, i
    i += 1
    out: list[str] = []
    while i < len(s):
        c = s[i]
        if q == "`" and c == "$" and i + 1 < len(s) and s[i + 1] == "{":
            return None, i  # template avec interpolation — non résolu
        if c == "\\" and i + 1 < len(s):
            out.append(s[i : i + 2])
            i += 2
            continue
        if c == q:
            return "".join(out), i + 1
        out.append(c)
        i += 1
    return None, i


def extract_create_page_metadata_block(text: str) -> str | None:
    """Retourne le segment à partir de createPageMetadata({ ... }) au niveau parenthèses."""
    m = re.search(r"createPageMetadata\s*\(\s*\{", text)
    if not m:
        return None
    start = m.end() - 1  # '{'
    depth = 0
    i = start
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[start : i + 1]
        i += 1
    return None


def parse_description_from_block(block: str) -> tuple[str | None, bool | None]:
    """(description brute, appendAuthorSuffix ou None si défaut True)."""
    append: bool | None = True
    m_aps = re.search(r"appendAuthorSuffix\s*:\s*(true|false)", block)
    if m_aps:
        append = m_aps.group(1) == "true"

    m = re.search(r"\bdescription\s*:", block)
    if not m:
        return None, append
    j = m.end()
    while j < len(block) and block[j] in " \t\n":
        j += 1
    # withOgDescriptionSuffix('...')
    if j < len(block) and block.startswith("withOgDescriptionSuffix", j):
        j2 = block.find("(", j)
        if j2 == -1:
            return None, append
        j2 = block.find("(", j) + 1
        while j2 < len(block) and block[j2] in " \t\n":
            j2 += 1
        s, _ = parse_string_at(block, j2)
        return s, append
    # identificateur (const)
    id_m = re.match(r"([A-Z_][A-Za-z0-9_]*)", block[j:])
    if id_m:
        return f"__REF__:{id_m.group(1)}", append
    s, _ = parse_string_at(block, j)
    return s, append


def resolve_const_in_file(text: str, name: str) -> str | None:
    """const NAME = '...' ou multiline."""
    pat = rf"(?:export\s+)?const\s+{re.escape(name)}\s*=\s*"
    m = re.search(pat, text)
    if not m:
        return None
    j = m.end()
    while j < len(text) and text[j] in " \t\n":
        j += 1
    s, _ = parse_string_at(text, j)
    if s is not None:
        return s
    # backtick template — skip
    return None


def path_to_url(rel: Path) -> str:
    """app/foo/bar/page.tsx -> /foo/bar"""
    parts = rel.parts
    if "app" not in parts:
        return ""
    i = parts.index("app") + 1
    segs = list(parts[i:-1]) if parts[-1] == "page.tsx" else list(parts[i:])
    if segs and segs[-1] == "page.tsx":
        segs = segs[:-1]
    # (group) -> [group]
    out = []
    for seg in segs:
        if seg.startswith("(") and seg.endswith(")"):
            continue
        if seg.startswith("["):
            out.append(f"[{seg[1:-1]}]")
        else:
            out.append(seg)
    return "/" + "/".join(out) if out else "/"


def scan_page_tsx(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)
    url = path_to_url(rel)
    rows: list[dict] = []

    if "createPageMetadata" not in text and "generateMetadata" not in text:
        return rows

    # generateMetadata dynamique
    if "generateMetadata" in text:
        gm = re.search(
            r"export\s+async\s+function\s+generateMetadata\s*\([^)]*\)\s*\{([\s\S]*?)\n\}",
            text,
        )
        if gm:
            inner = gm.group(1)
            # createPageMetadata imbriqué
            block = extract_create_page_metadata_block(inner)
            if block:
                raw, append = parse_description_from_block(block)
                if raw and not raw.startswith("__REF__:"):
                    final = raw.strip() if append is False else with_og_suffix(raw)
                    rows.append(
                        {
                            "file": str(rel).replace("\\", "/"),
                            "url": url + " (generateMetadata)",
                            "length": len(final),
                            "status": status_for(len(final)),
                            "text": final,
                        }
                    )
                elif raw and raw.startswith("__REF__:"):
                    ref = raw.split(":", 1)[1]
                    resolved = resolve_const_in_file(text, ref)
                    if resolved:
                        final = resolved.strip() if append is False else with_og_suffix(resolved)
                        rows.append(
                            {
                                "file": str(rel).replace("\\", "/"),
                                "url": url + " (generateMetadata)",
                                "length": len(final),
                                "status": status_for(len(final)),
                                "text": final,
                            }
                        )

    # export const metadata = createPageMetadata
    if "createPageMetadata" in text:
        # plusieurs blocs possibles (ex. formation-ia/[slug])
        for m in re.finditer(r"createPageMetadata\s*\(\s*\{", text):
            start = m.start()
            sub = text[start:]
            block = extract_create_page_metadata_block(sub)
            if not block:
                continue
            raw, append = parse_description_from_block(block)
            if not raw:
                continue
            if raw.startswith("__REF__:"):
                ref = raw.split(":", 1)[1]
                resolved = resolve_const_in_file(text, ref)
                if not resolved:
                    rows.append(
                        {
                            "file": str(rel).replace("\\", "/"),
                            "url": url,
                            "length": -1,
                            "status": "⚠️ REF",
                            "text": f"(const {ref} — résolution manuelle)",
                        }
                    )
                    continue
                raw = resolved
            final = raw.strip() if append is False else with_og_suffix(raw)
            rows.append(
                {
                    "file": str(rel).replace("\\", "/"),
                    "url": url,
                    "length": len(final),
                    "status": status_for(len(final)),
                    "text": final,
                }
            )

    # export const metadata = getBlogIndexMetadata(...) — pas de description inline
    if re.search(r"export\s+const\s+metadata\s*=\s*getBlogIndexMetadata", text):
        rows.append(
            {
                "file": str(rel).replace("\\", "/"),
                "url": url,
                "length": -1,
                "status": "ℹ️",
                "text": "(voir lib/blog-metadata.ts — DESC)",
            }
        )

    return rows


def main() -> None:
    rows: list[dict] = []

    # layout racine
    layout = APP / "layout.tsx"
    lt = layout.read_text(encoding="utf-8")
    if "withOgDescriptionSuffix(SITE_CONFIG.description)" in lt:
        final = with_og_suffix(SITE_CONFIG_DESCRIPTION)
        rows.append(
            {
                "file": "app/layout.tsx",
                "url": "/ (fallback layout)",
                "length": len(final),
                "status": status_for(len(final)),
                "text": final,
            }
        )

    # Pages statiques
    for p in sorted(APP.rglob("page.tsx")):
        rows.extend(scan_page_tsx(p))

    # blog-metadata DESC (blog index + catégories)
    bm = ROOT / "lib" / "blog-metadata.ts"
    bmt = bm.read_text(encoding="utf-8")
    desc_m = re.search(r"const\s+DESC\s*=\s*", bmt)
    if desc_m:
        j = desc_m.end()
        while bmt[j] in " \t\n":
            j += 1
        s, _ = parse_string_at(bmt, j)
        if s:
            for u, label in [
                ("/blog", "liste blog p.1"),
                ("/blog/page/N", "pagination blog"),
                ("/blog/categorie/[slug]", "catégorie blog"),
            ]:
                rows.append(
                    {
                        "file": "lib/blog-metadata.ts",
                        "url": f"{u} ({label})",
                        "length": len(s),
                        "status": status_for(len(s)),
                        "text": s + " [appendAuthorSuffix: false]",
                    }
                )
            # catégorie avec suffixe
            cat_desc = f"{s} Catégorie : { '{categoryLabel}' }."
            rows.append(
                {
                    "file": "lib/blog-metadata.ts",
                    "url": "/blog/categorie/[slug] (template cat.)",
                    "length": len(cat_desc),
                    "status": status_for(len(cat_desc)),
                    "text": cat_desc,
                }
            )

    # JSON generated articles
    def extract_slug_desc_from_json_header(raw: str) -> tuple[str, str]:
        head = raw[:12000]
        m_slug = re.search(r'"slug"\s*:\s*"([^"]+)"', head)
        m_desc = re.search(r'"description"\s*:\s*"((?:[^"\\]|\\.)*)"', head)
        slug = m_slug.group(1) if m_slug else ""
        desc = ""
        if m_desc:
            desc = (
                m_desc.group(1)
                .replace("\\n", "\n")
                .replace('\\"', '"')
                .replace("\\\\", "\\")
            )
        return slug, desc.strip()

    for jp in sorted(CONTENT_GEN.glob("article-*.json")):
        raw_json = jp.read_text(encoding="utf-8")
        slug, desc = "", ""
        try:
            data = json.loads(raw_json)
            slug = data.get("slug", "")
            desc = (data.get("description") or "").strip()
        except json.JSONDecodeError:
            slug, desc = extract_slug_desc_from_json_header(raw_json)
            if not desc:
                rows.append(
                    {
                        "file": str(jp.relative_to(ROOT)).replace("\\", "/"),
                        "url": f"/blog/{slug or '?'}",
                        "length": -1,
                        "status": "⚠️ JSON",
                        "text": "(description non extraite — JSON invalide)",
                    }
                )
                continue
        rows.append(
            {
                "file": str(jp.relative_to(ROOT)).replace("\\", "/"),
                "url": f"/blog/{slug}",
                "length": len(desc),
                "status": status_for(len(desc)),
                "text": desc,
            }
        )

    # MDX blog
    for mdx in sorted(CONTENT_BLOG.glob("*.mdx")):
        raw = mdx.read_text(encoding="utf-8")
        if "---" not in raw:
            continue
        fm = raw.split("---", 2)
        if len(fm) < 3:
            continue
        front = fm[1]
        slug_m = re.search(r"^slug:\s*(.+)$", front, re.M)
        desc_m = re.search(r"^description:\s*(.+)$", front, re.M)
        if not desc_m:
            continue
        desc = desc_m.group(1).strip().strip('"').strip("'")
        slug = slug_m.group(1).strip() if slug_m else mdx.stem
        rows.append(
            {
                "file": str(mdx.relative_to(ROOT)).replace("\\", "/"),
                "url": f"/blog/{slug}",
                "length": len(desc),
                "status": status_for(len(desc)),
                "text": desc,
            }
        )

    # Dédupliquer fichiers/url identiques (plusieurs createPageMetadata sur une même page)
    seen: set[tuple[str, str, int, str]] = set()
    unique_rows: list[dict] = []
    for r in rows:
        key = (r["file"], r["url"], r["length"], r["text"][:80] if r["length"] != -1 else "")
        if key in seen:
            continue
        seen.add(key)
        unique_rows.append(r)

    # Sort: problèmes d'abord
    order = {"❌ TROP LONGUE": 0, "🔴 TROP COURTE": 1, "⚠️ LIMITE": 2, "⚠️ REF": 3, "ℹ️": 4, "✅ OK": 5}
    unique_rows.sort(key=lambda r: (order.get(r["status"], 9), r["file"], r["url"]))

    print(f"TOTAL_LIGNES={len(unique_rows)}")
    for r in unique_rows:
        t = r["text"].replace("|", "\\|")
        print(f"{r['file']}\t{r['url']}\t{r['length']}\t{r['status']}\t{t}")


if __name__ == "__main__":
    main()
