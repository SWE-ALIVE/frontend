import { useEffect, useState } from "react";

interface TypeAnimationOptions {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const useTypeAnimation = ({
  text,
  speed = 50,
  onComplete,
}: TypeAnimationOptions) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
