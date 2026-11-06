/**
 * Infrastructure as Code Railway (généré depuis `railway.toml`, variables non gérées ici).
 * Avant `railway config migrate cutover`, le déploiement lit encore `railway.toml`.
 * Vérifier la branche GitHub ci‑dessous si elle diffère de votre branche de production.
 */
import { defineRailway, github, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "site-formation";
export default defineRailway(() => {
  const siteFormation = service("site-formation", {
    source: github("Laure78/site-formation", { branch: "main", checkSuites: false }),
    build: { buildCommand: "NODE_OPTIONS=--max-old-space-size=4096 npm run build", buildEnvironment: "V3", builder: "RAILPACK" },
    start: "npm run start",
    replicas: { "us-west2": 1 },
    domains: ["laureolivie.fr", "www.laureolivie.fr"],
  });

  return project("courteous-smile", {
    variables: { managed: false },
    resources: [siteFormation],
  });
});
