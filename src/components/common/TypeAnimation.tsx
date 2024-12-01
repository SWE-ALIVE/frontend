import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface TypeAnimationProps {
  text: string;
  style?: TextStyle;
  onComplete?: () => void;
}

const TypeAnimation = ({ text, style, onComplete }: TypeAnimationProps) => {
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
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <Text style={[styles.text, style]}>{displayedText}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default TypeAnimation;
