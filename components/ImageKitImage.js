'use client';

import { Image as IKImage } from '@imagekit/next';
import { useState } from 'react';

const urlEndpoint = 'https://ik.imagekit.io/bm2sipware';

export default function ImageKitImage({
  src,
  alt = '',
  width = 500,
  height = 500,
  transformation = [],
  className = '',
  style = {},
  priority = false,
  ...props
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`ph ${className}`} role="img" aria-label={alt} style={{ display: 'grid', placeItems: 'center', background: 'var(--sage)', color: 'var(--mute)', ...style }}>
        ☕
      </div>
    );
  }

  let cleanSrc = src;
  if (src.includes('ik.imagekit.io')) {
    cleanSrc = src.replace(/^https?:\/\/ik\.imagekit\.io\/[^/]+/, '');
  }

  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      src={cleanSrc.startsWith('/') ? cleanSrc : `/${cleanSrc}`}
      alt={alt}
      width={width}
      height={height}
      transformation={transformation}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
      {...props}
    />
  );
}
