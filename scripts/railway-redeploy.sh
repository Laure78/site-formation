#!/usr/bin/env bash
# Redéploie le service lié au repo (commit main courant).
# Prérequis : une fois `railway login` OU variable RAILWAY_TOKEN (Project Token).
set -euo pipefail
cd "$(dirname "$0")/.."

CLI=(npx --yes @railway/cli)

if [[ -n "${RAILWAY_TOKEN:-}" ]]; then
  echo "→ Déploiement avec RAILWAY_TOKEN (project token)…"
else
  echo "→ Vérification connexion Railway…"
  if ! "${CLI[@]}" whoami >/dev/null 2>&1; then
    echo "Connexion requise. Une page va s’ouvrir dans le navigateur."
    "${CLI[@]}" login
  fi
fi

if [[ ! -f .railway/config.json ]] && [[ -z "${RAILWAY_TOKEN:-}" ]]; then
  echo "→ Liaison au projet (choisissez le workspace puis site-formation)…"
  "${CLI[@]}" link
fi

echo "→ Redeploy du service courant (dernier commit Git déjà sur main)…"
"${CLI[@]}" redeploy --yes

echo "→ Suivi des logs (Ctrl+C pour quitter)…"
"${CLI[@]}" logs --deployment
