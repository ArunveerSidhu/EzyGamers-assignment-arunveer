import { Audio } from "expo-av";
import { useEffect, useState } from "react";

let soundInstance: Audio.Sound | null = null;

export function useBackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadAndPlayMusic();
    
    return () => {
      if (soundInstance) {
        soundInstance.unloadAsync();
        soundInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    if (soundInstance && isLoaded) {
      if (isMuted) {
        soundInstance.setVolumeAsync(0);
      } else {
        soundInstance.setVolumeAsync(1);
      }
    }
  }, [isMuted, isLoaded]);

  const loadAndPlayMusic = async () => {
    try {
      if (!soundInstance) {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/music/bg-music.mp3"),
          {
            isLooping: true,
            volume: isMuted ? 0 : 1,
          }
        );

        soundInstance = sound;
        setIsLoaded(true);
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error loading background music:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return {
    isMuted,
    toggleMute,
  };
}

