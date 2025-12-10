"use client";

import { useState } from "react";

export default function InteractiveIcon({
  src,
  alt,
  className,
  hoverTransform = "rotateY(180deg)",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <img
      src={src}
      alt={alt || "Service icon"}
      className={className}
      style={{
        transition: "transform .3s ease",
        transformStyle: "preserve-3d",
        transform: isHovered ? hoverTransform : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}



