import { useCallback, useRef, useState } from "react";

export function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);

 const recorderRef = useRef<RecordRTCType | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const micStreamRef = useRef<{ onDestroy: () => void } | null>(null);}

  const destroyWaveSurfer = useCallback(() => {
    if (micStreamRef.current) {
        micStreamRef.current.onDestroy();
        micStreamRef.current = null;
    }
    if (wsRef.current) {
        wsRef.current.destroy();
        wsRef.current = null;
    }
  }, []);
}