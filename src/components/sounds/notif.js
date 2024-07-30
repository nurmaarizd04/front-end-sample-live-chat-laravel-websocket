import { useMemo } from "react";

const PlayNotif = (url) => {
  const audio = useMemo(() => new Audio(url), [url]);

  const playSound = () => {
    audio.play().catch((error) => {
      console.error("Failed to play notification sound:", error);
    });
  };

  return playSound;
};

export default PlayNotif;
