//audio setup
import audioService from "../services/audioService";

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    audioService.playRandomKeyStrokeSound();
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
