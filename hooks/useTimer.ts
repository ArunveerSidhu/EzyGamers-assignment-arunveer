import { useEffect, useRef, useState } from "react";

interface UseTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  reset: (newTime?: number) => void;
  formatTime: () => string;
}

export function useTimer(
  initialTime: number,
  onTimeUp: () => void
): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    if (timeRemaining > 0) {
      setIsRunning(true);
    }
  };

  const reset = (newTime?: number) => {
    setTimeRemaining(newTime ?? initialTime);
    setIsRunning(false);
  };

  const formatTime = (): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    isRunning,
    pause,
    resume,
    reset,
    formatTime,
  };
}

