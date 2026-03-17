'use client';

import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';

interface FormationPhotosProps {
  variant?: 'default' | 'recrutement' | 'travaux-publics' | 'productivite';
}

export function FormationPhotos({ variant = 'default' }: FormationPhotosProps) {
  const getPhotos = () => {
    switch (variant) {
      case 'recrutement':
        return [
          PHOTOS.bannerRecrutementDifficile,
          PHOTOS.bannerRecrutement,
          PHOTOS.formationEntreprise,
        ];
      case 'travaux-publics':
        return [
          PHOTOS.ouvrierPlan,
          PHOTOS.ouvrierConfiant,
          PHOTOS.architecteConcentration,
        ];
      case 'productivite':
        return [
          PHOTOS.formationEntreprise,
          PHOTOS.studioDark,
          PHOTOS.linkedinGraz,
        ];
      default:
        return [
          PHOTOS.bannerSolutionsConcretres,
          PHOTOS.formationEntreprise,
          PHOTOS.linkedinGraz,
        ];
    }
  };

  const photos = getPhotos();

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
