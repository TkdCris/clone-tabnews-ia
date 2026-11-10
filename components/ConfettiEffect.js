"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiEffect() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  if (!isClient || windowDimensions.width === 0) {
    return null;
  }

  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      recycle={false}
      numberOfPieces={350}
      gravity={0.18}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
