import { ImageResponse } from 'next/og';
import { formatProfessionalsTrainedCount } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Formation IA BTP';
  const category = searchParams.get('category') || 'Formation';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#377CF3',
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            color: '#D4E3FC',
            fontSize: '24px',
            marginBottom: '20px',
          }}
        >
          {category} · Laure Olivié — OFC Création d&apos;Entreprise
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '56px',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '20px',
            marginTop: '40px',
            opacity: 0.8,
          }}
        >
          {`Qualiopi · Finançable Constructys · ${formatProfessionalsTrainedCount()} professionnels formés`}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
