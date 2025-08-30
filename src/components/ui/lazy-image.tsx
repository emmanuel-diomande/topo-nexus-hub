import { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, className = "", style }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
  }, [src]);

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`} style={style}>
        <span className="text-muted-foreground text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {!loaded && (
        <div className="absolute inset-0 image-loading rounded-inherit" />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default LazyImage;