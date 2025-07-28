import { useEffect } from "react";


export function BackgroundBlurComponent(props: {
  isBackground: boolean;
  zIndex?: string;
  className?: string;
  isVisible: boolean;
}) {
  const { zIndex, isBackground, isVisible } = props;
 
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);
 
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: isBackground ? "rgba(0, 0, 0, 0.8)" : "",
      }}
      className={`  fixed inset-0 overflow-hidden   ${zIndex} ${
        isVisible ? "animate-customOpacityAnimation pointer-events-auto" : ""
      }`}
    ></div>
  );
}
      