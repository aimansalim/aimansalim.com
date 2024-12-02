import Image from 'next/image';

interface DottedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function DottedImage({ src, alt, width, height }: DottedImageProps) {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'contrast(1.1) brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-emerald-500/5" />
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0),
            linear-gradient(to right, rgba(255,255,255,0.1), transparent)
          `,
          backgroundSize: '4px 4px, 100% 100%'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
    </div>
  );
}
