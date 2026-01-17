import { useEffect, useRef, useState } from "react";
import { PlayingIcon } from "./icons/PlayingIcon";

type PlayerStatus = "idle" | "loading" | "playing" | "paused";

interface VoiceMessageProps {
  status: PlayerStatus;
  audioSrc: string;
  duration: string;
  waveform: number[];
  time: string;
  type: "sent" | "recieved";
  sentIcon?: React.ReactNode;

  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const VoiceMessage = ({
  status,
  audioSrc,
  duration,
  waveform,
  time,
  type,
  sentIcon,
  onPlay,
  onPause,
  onStop,
}: VoiceMessageProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      const index = Math.floor(
        (audio.currentTime / audio.duration) * waveform.length,
      );
      setProgress(index);
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setCurrentTime(0);
      onStop();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [waveform.length, onStop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === "playing") {
      audio.play().catch(() => onPause());
    }

    if (status === "paused") {
      audio.pause();
    }

    if (status === "idle") {
      audio.pause();
      audio.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  }, [status, onPause]);

  const handleClick = () => {
    if (status === "loading") return;
    if (status === "playing") onPause();
    else onPlay();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isPlaying = status === "playing";

  return (
    <div
      className={`px-3 py-2.5 flex items-center gap-3 ${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      }`}
    >
      <button onClick={handleClick} className="cursor-pointer">
        <PlayingIcon status={status} />
      </button>

      <div className="grid gap-1">
        <div className="flex items-end gap-0.5">
          {waveform.map((v, i) => (
            <div
              key={i}
              className="w-[2px] rounded"
              style={{
                height: `${v}px`,
                backgroundColor:
                  isPlaying && i < progress ? "#CEC8FF" : "#9587F5",
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray">
            {isPlaying ? formatTime(currentTime) : duration}
          </span>

          <div className="flex gap-0.5 items-center">
            <span className="text-sm text-gray">{time}</span>
            {type === "sent" && sentIcon}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
};
