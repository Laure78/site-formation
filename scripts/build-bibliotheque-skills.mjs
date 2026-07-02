#!/usr/bin/env node
/**
 * Génère les téléchargements .skill (zip) et .md depuis les skills BeWork.
 * Source : ../BeWork/bework/skills/<id>/SKILL.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BEWORK_SKILLS_DIR =
  process.env.BEWORK_SKILLS_DIR ?? path.resolve(ROOT, '../BeWork/bework/skills');
const OUT_DIR = path.join(ROOT, 'public/ressources/skills');
const MANIFEST_PATH = path.join(ROOT, 'lib/bibliotheque-skills/manifest.json');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { name: '', description: '' };
  const yaml = match[1];
  const name = yaml.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? '';
  const description = yaml.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? '';
  return { name, description };
}

function listSkillDirs() {
  if (!fs.existsSync(BEWORK_SKILLS_DIR)) {
    console.error(`Dossier skills introuvable : ${BEWORK_SKILLS_DIR}`);
    process.exit(1);
  }
  return fs
    .readdirSync(BEWORK_SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(BEWORK_SKILLS_DIR, d.name, 'SKILL.md')))
    .map((d) => d.name)
    .sort();
}

function zipSkill(skillId, skillDir, outSkillPath) {
  const tmpZip = path.join(skillDir, '..', `.${skillId}.skill.tmp.zip`);
  if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
  execSync(`cd "${BEWORK_SKILLS_DIR}" && zip -r -q "${tmpZip}" "${skillId}"`, {
    stdio: 'pipe',
  });
  fs.copyFileSync(tmpZip, outSkillPath);
  fs.unlinkSync(tmpZip);
}

function build() {
  const ids = listSkillDirs();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

  const skills = [];

  for (const id of ids) {
    const srcDir = path.join(BEWORK_SKILLS_DIR, id);
    const srcMd = path.join(srcDir, 'SKILL.md');
    const destDir = path.join(OUT_DIR, id);
    fs.mkdirSync(destDir, { recursive: true });

    const mdContent = fs.readFileSync(srcMd, 'utf8');
    const { name, description } = parseFrontmatter(mdContent);

    const mdFile = `${id}.md`;
    const skillFile = `${id}.skill`;
    fs.writeFileSync(path.join(destDir, mdFile), mdContent);
    fs.copyFileSync(srcMd, path.join(destDir, 'SKILL.md'));
    zipSkill(id, srcDir, path.join(destDir, skillFile));

    const hasAssets =
      fs.existsSync(path.join(srcDir, 'assets')) || fs.existsSync(path.join(srcDir, 'scripts'));

    skills.push({
      id,
      name: name || id,
      description,
      mdUrl: `/ressources/skills/${id}/${mdFile}`,
      skillMdUrl: `/ressources/skills/${id}/SKILL.md`,
      skillUrl: `/ressources/skills/${id}/${skillFile}`,
      hasAssets,
    });

    console.log(`✓ ${id}`);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: BEWORK_SKILLS_DIR,
    count: skills.length,
    skills,
  };

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\n${skills.length} skills → ${OUT_DIR}`);
  console.log(`Manifest → ${MANIFEST_PATH}`);
}

build();
