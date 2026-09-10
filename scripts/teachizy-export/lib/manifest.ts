import type {
  TeachizyExportBilan,
  TeachizyExportManifest,
  TeachizyFormation,
  TeachizyAsset,
  TeachizyLesson,
} from './types';

export function emptyBilan(): TeachizyExportBilan {
  return {
    formationsParcourues: 0,
    pdfDetectes: 0,
    pdfTelecharges: 0,
    xlsDetectes: 0,
    xlsTelecharges: 0,
    liensDetectes: 0,
    liensEnregistres: 0,
    doublons: 0,
    inaccessibles: 0,
    invalidFile: 0,
    erreurs: 0,
    erreursDetail: [],
  };
}

function lessonAssets(lesson: TeachizyLesson): TeachizyAsset[] {
  return lesson.assets?.length ? lesson.assets : lesson.pdfs ?? [];
}

export function recomputeBilan(formations: TeachizyFormation[]): TeachizyExportBilan {
  const bilan = emptyBilan();
  bilan.formationsParcourues = formations.length;

  const walk = (assets: TeachizyAsset[]) => {
    for (const p of assets) {
      if (p.kind === 'pdf') bilan.pdfDetectes += 1;
      else if (p.kind === 'xlsx' || p.kind === 'xls') bilan.xlsDetectes += 1;
      else if (p.kind === 'link') bilan.liensDetectes += 1;

      switch (p.status) {
        case 'downloaded':
          if (p.kind === 'pdf') bilan.pdfTelecharges += 1;
          else if (p.kind === 'xlsx' || p.kind === 'xls') bilan.xlsTelecharges += 1;
          break;
        case 'recorded':
          if (p.kind === 'link') bilan.liensEnregistres += 1;
          break;
        case 'skipped_duplicate':
          bilan.doublons += 1;
          if (p.kind === 'pdf' && p.localPath) bilan.pdfTelecharges += 1;
          if ((p.kind === 'xlsx' || p.kind === 'xls') && p.localPath) bilan.xlsTelecharges += 1;
          break;
        case 'inaccessible':
          bilan.inaccessibles += 1;
          break;
        case 'invalid_file':
          bilan.invalidFile += 1;
          break;
        case 'error':
          bilan.erreurs += 1;
          if (p.error) bilan.erreursDetail.push(p.error);
          break;
        default:
          break;
      }
    }
  };

  for (const f of formations) {
    for (const m of f.modules) {
      for (const l of m.lessons) walk(lessonAssets(l));
    }
    for (const l of f.rootLessons) walk(lessonAssets(l));
  }
  return bilan;
}

export function formatBilanText(manifest: TeachizyExportManifest): string {
  const b = manifest.bilan;
  const lines = [
    '=== Bilan export Teachizy ===',
    `Généré le : ${manifest.generatedAt}`,
    `Espace : ${manifest.storeUrl}`,
    `Mode inventaire seul : ${manifest.inventoryOnly ? 'oui' : 'non'}`,
    '',
    `Formations parcourues : ${b.formationsParcourues}`,
    `PDF détectés         : ${b.pdfDetectes}`,
    `PDF téléchargés      : ${b.pdfTelecharges}`,
    `Excel détectés       : ${b.xlsDetectes}`,
    `Excel téléchargés    : ${b.xlsTelecharges}`,
    `Liens détectés       : ${b.liensDetectes}`,
    `Liens enregistrés    : ${b.liensEnregistres}`,
    `Doublons             : ${b.doublons}`,
    `Inaccessibles        : ${b.inaccessibles}`,
    `Fichiers invalides   : ${b.invalidFile}`,
    `Erreurs              : ${b.erreurs}`,
  ];
  if (b.erreursDetail.length) {
    lines.push('', 'Détail des erreurs :');
    for (const e of b.erreursDetail.slice(0, 50)) {
      lines.push(` - ${e}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}
