import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioVisualizeProps {
  audioUrl: string;
  volume?: number;
  onPulse?: () => void;
  sensitivity?: {
    volumeThreshold?: number;
    volumeChangeThreshold?: number;
    minInterval?: number;
    maxPulses?: number;
  };
}

interface UseAudioVisualizeReturn {
  isReady: boolean;
  isPlaying: boolean;
  volume: number;
  startVisualization: () => Promise<void>;
  stopVisualization: () => void;
  cleanup: () => void;
}

const useAudioVisualize = ({
  audioUrl,
  volume = 0.3,
  onPulse,
  sensitivity = {},
}: UseAudioVisualizeProps): UseAudioVisualizeReturn => {
  const {
    volumeThreshold = 8,
    volumeChangeThreshold = 5,
    minInterval = 100,
    maxPulses = 100,
  } = sensitivity;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isVisualizingRef = useRef<boolean>(false);
  const lastPulseTimeRef = useRef<number>(0);
  const lastVolumeRef = useRef<number>(0);
  const pulseCountRef = useRef<number>(0);

  // Initialize audio system
  const initializeAudio = useCallback(async () => {
    if (isReady) return true;

    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      // Create analyser
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512;
      analyserRef.current.smoothingTimeConstant = 0.2;

      // Create audio element
      audioElementRef.current = new Audio(audioUrl);
      audioElementRef.current.loop = true;
      audioElementRef.current.volume = volume;
      audioElementRef.current.preload = "auto";

      // Wait for audio to be ready
      await new Promise((resolve, reject) => {
        audioElementRef.current!.addEventListener("canplaythrough", resolve, {
          once: true,
        });
        audioElementRef.current!.addEventListener("error", reject, {
          once: true,
        });
        audioElementRef.current!.load();
      });

      // Connect to Web Audio API
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(
        audioElementRef.current
      );
      sourceNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      setIsReady(true);
      return true;
    } catch (error) {
      console.error("Error initializing audio:", error);
      return false;
    }
  }, [audioUrl, volume, isReady]);

  // Audio analysis and pulse detection
  const analyzeAudio = useCallback(() => {
    if (!isVisualizingRef.current || !analyserRef.current) return;

    const bufferLength = analyserRef.current.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteTimeDomainData(dataArray);

    // Calculate volume
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const sample = (dataArray[i] - 128) / 128;
      sum += sample * sample;
    }
    const detectedVolume = Math.sqrt(sum / bufferLength) * 100;
    setCurrentVolume(detectedVolume);

    // Pulse detection
    const currentTime = performance.now();
    const timeSinceLastPulse = currentTime - lastPulseTimeRef.current;
    const volumeChange = detectedVolume - lastVolumeRef.current;

    if (
      detectedVolume > volumeThreshold &&
      volumeChange > volumeChangeThreshold &&
      timeSinceLastPulse > minInterval &&
      pulseCountRef.current < maxPulses
    ) {
      onPulse?.();
      lastPulseTimeRef.current = currentTime;
      pulseCountRef.current += 1;
    }

    lastVolumeRef.current = detectedVolume;
    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  }, [volumeThreshold, volumeChangeThreshold, minInterval, maxPulses, onPulse]);

  // Start visualization
  const startVisualization = useCallback(async () => {
    if (isVisualizingRef.current) return;

    const audioInitialized = await initializeAudio();
    if (!audioInitialized || !audioElementRef.current) return;

    isVisualizingRef.current = true;
    lastPulseTimeRef.current = 0;
    lastVolumeRef.current = 0;
    pulseCountRef.current = 0;

    try {
      analyzeAudio();
      await audioElementRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error starting visualization:", error);
      isVisualizingRef.current = false;
    }
  }, [initializeAudio, analyzeAudio]);

  // Stop visualization
  const stopVisualization = useCallback(() => {
    isVisualizingRef.current = false;

    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsPlaying(false);
    setCurrentVolume(0);
    lastPulseTimeRef.current = 0;
    lastVolumeRef.current = 0;
    pulseCountRef.current = 0;
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    stopVisualization();
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsReady(false);
  }, [stopVisualization]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isReady,
    isPlaying,
    volume: currentVolume,
    startVisualization,
    stopVisualization,
    cleanup,
  };
};

export default useAudioVisualize;
