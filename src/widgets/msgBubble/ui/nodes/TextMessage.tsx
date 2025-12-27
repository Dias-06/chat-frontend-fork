import { ReactNode } from "react";

interface TextMessageProps {
  content: string;
  time: string;
  type: "sent" | "recieved";
  sentIcon: ReactNode;
  classFix: string;
}

export const TextMessage = ({
  content,
  time,
  type,
  sentIcon,
  classFix,
}: TextMessageProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      } ${classFix} h-fit max-w-73.25 w-fit px-3 py-2.5 flex gap-2`}
    >
      <p className="leading-[1.3] text-balance">{content}</p>
      <div className="flex gap-0.5 self-end">
        <p className="text-sm text-gray leading-[1.2]">{time}</p>
        {type === "sent" && sentIcon}
      </div>
    </div>
  );
};
