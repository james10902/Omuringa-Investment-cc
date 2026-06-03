"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
  fallbackContent?: React.ReactNode;
}

/**
 * Wraps next/image with a graceful fallback when the image file is missing.
 * Falls back to a styled placeholder div with optional content.
 */
export function SafeImage({
  fallbackClassName,
  fallbackContent,
  className,
  alt,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={
          fallbackClassName ||
          "w-full h-full bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center"
        }
        aria-label={alt}
      >
        {fallbackContent}
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
