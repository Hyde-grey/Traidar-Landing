import { createContext, useContext, useState } from "react";

interface SoundContextType {
  isAmbientPlaying: boolean;
  setIsAmbientPlaying: (playing: boolean) => void;
  handleSoundComplete: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  const handleSoundComplete = () => {
    setIsAmbientPlaying(false);
  };

  return (
    <SoundContext.Provider
      value={{ isAmbientPlaying, setIsAmbientPlaying, handleSoundComplete }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
}
