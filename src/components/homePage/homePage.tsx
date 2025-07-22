import { useEffect, useState } from "react";
import { Div } from "../../divComponent/div";

export function HomeComponent() {
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOutVideo, setFadeOutVideo] = useState(false);
  const [showNextDiv, setShowNextDiv] = useState(false);

useEffect(() => {
  const timeout1 = setTimeout(() => {
    setFadeOutVideo(true);
  }, 2800); // start fading out just before 3s

  const timeout2 = setTimeout(() => {
    setShowVideo(false);
    setShowNextDiv(true);
  }, 3000); // fully remove video and show next div

  return () => {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
  };
}, []);


  return (
    <Div className="mainDiv overflow-hidden relative w-full h-screen bg-black/95 lg-black-screen">
      {/* VIDEO SECTION */}
      {showVideo && (
        <video
          autoPlay
          loop={false}
          muted
          playsInline
          className={`w-screen h-h1000 object-cover absolute top-0 left-0 transition-opacity duration-500 ${
            fadeOutVideo ? "opacity-0" : "opacity-100"
          }`}
        >
          <source src="src/videos/backgroundVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* NEXT DIV SECTION (Fade in & stay) */}
      {showNextDiv && (
        <Div className="w-full h-full flex flex-col items-center bg-white animate-fade-in">
          <h1 className="text-4xl font-bold">Welcome to Mindmile 🌟</h1>
        </Div>
      )}
    </Div>
  );
}
