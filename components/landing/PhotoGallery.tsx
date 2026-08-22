'use client';

import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

export function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {photos.map((photo, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          
            quality={70}
            loading="lazy"/>
        </div>
      ))}
    </div>
  );
}
