import { useEffect, useState } from "react";
import { Div } from "../../divComponent/div";
import backgroundImg from "../../images/backgroundimg (2).png";

export function HomeComponent() {
  const [showImage, setShowImage] = useState(true);
  const [showNextDiv, setShowNextDiv] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);       // hide image
      setShowNextDiv(true);      // show next content
    }, 3000); // 3 seconds total

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Div className="mainDiv overflow-hidden w-full h-full bg-black/95 lg-black-screen">
      {/* IMAGE SECTION (fades in and out via CSS) */}
      {showImage && (
        <img
          src={backgroundImg}
          className="w-full h-full animate-fade-in-out"
          alt="Splash Background"
        />
      )}

      {/* NEXT DIV SECTION (stays) */}
      {showNextDiv && (
        <Div className="w-full h-full flex flex-col items-center justify-center bg-white animate-fade-in">
          <h1 className="text-4xl font-bold">Welcome to Mindmile 🌟</h1>
        </Div>
      )}
    </Div>
  );
}
