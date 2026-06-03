"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

/**
 * Wraps next/image with a graceful fallback when the image file is missing.
 * Falls back to a styled div with the fallbackClassName.
 */
export function SafeImage({
  fallbackClassName,
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
          "w-full h-full bg-brand-700"
        }
        aria-label={alt}
      />
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
