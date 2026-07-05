import { ImageResponse } from 'next/og';
import { PERSON_NAME } from '@/lib/seo';

export const alt = 'Udara Nalawansa DevOps engineer portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#191724',
          color: '#faf4ed',
          padding: 72,
          fontFamily: 'Arial',
        }}
      >
        <div style={{ fontSize: 28, color: '#ebbcba', marginBottom: 28 }}>
          udaradev.me
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          {PERSON_NAME}
        </div>
        <div style={{ fontSize: 38, color: '#e0def4', marginTop: 28 }}>
          DevOps Engineer in Sri Lanka
        </div>
        <div style={{ fontSize: 28, color: '#9ccfd8', marginTop: 36 }}>
          Kubernetes | CI/CD | Terraform | Docker | AWS | MLOps
        </div>
      </div>
    ),
    size
  );
}
