'use client';

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/v\/([^&\s?]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

export function YouTubeOrVideoEmbed({ url }: { url: string }) {
  const ytId = getYouTubeVideoId(url);

  if (ytId) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?rel=0`}
          title="Vidéo YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (url.includes('vimeo.com')) {
    const vimeoId = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
    if (vimeoId) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title="Vidéo Vimeo"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      );
    }
  }

  if (url.match(/\.(mp4|webm|ogg)(\?|$)/i)) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
        <video controls className="h-full w-full" src={url}>
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-8 text-center">
      <p className="text-slate-600">Lien vidéo non reconnu</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline">
        Ouvrir dans un nouvel onglet
      </a>
    </div>
  );
}
