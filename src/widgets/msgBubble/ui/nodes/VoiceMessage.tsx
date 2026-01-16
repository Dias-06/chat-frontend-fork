import { useEffect, useRef, useState } from "react";
import { PlayingIcon } from "./icons/PlayingIcon";

interface VoiceMessageProps {
  isLoading: boolean;
  audioSrc: string;
  duration: string;
  waveform: number[];
  time: string;
  type: "sent" | "recieved";
  sentIcon?: React.ReactNode;
  stopLoading: () => void;
}

export const VoiceMessage = ({
  isLoading,
  audioSrc,
  duration,
  waveform,
  time,
  type,
  sentIcon,
  stopLoading,
}: VoiceMessageProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.pause() : audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!isPlaying) return;
      const idx = Math.floor((audio.currentTime / audio.duration) * 31);
      setProgress(idx);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [isPlaying]);

  return (
    <div
      className={`px-3 py-2.5 flex items-center gap-3 ${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      }`}
    >
      <button
        onClick={isLoading ? stopLoading : togglePlay}
        className="cursor-pointer"
      >
        <PlayingIcon
          status={isPlaying ? "playing" : isLoading ? "loading" : "idle"}
        />
      </button>

      <div className="grid gap-1">
        <div className="flex items-end gap-0.5">
          {waveform.map((v, i) => (
            <div
              key={i}
              className="w-[2px] bg-current rounded rounded-[10px]"
              style={{
                height: `${v}px`,
                backgroundColor:
                  isPlaying && i < progress ? "#CEC8FF" : "#9587F5",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray leading-[1.2]">{duration}</span>
          <div className="flex gap-0.5 items-center">
            <span className="text-sm text-gray leading-[1.2]">{time}</span>
            {type === "sent" && sentIcon}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};
