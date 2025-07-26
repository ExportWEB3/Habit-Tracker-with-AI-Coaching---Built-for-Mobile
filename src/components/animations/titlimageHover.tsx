import React, { useRef } from "react";
import { TiltImageProps } from "../../utilities/typedec";
import "../homePage/homePage.css"



export function TiltImage({
  src,
  alt = "Image",
  className = "",
  containerClassName = "",
}: TiltImageProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -20;
    const rotateY = ((x / width) - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className={`w-full h-full ${containerClassName} `}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full transition-transform duration-200 ease-out rounded-xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
        />
      </div>
    </div>
  );
}
