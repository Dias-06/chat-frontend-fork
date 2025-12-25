interface TextMessageProps {
  content: string;
  time: string;
  type: "sent" | "recieved";
}

export const TextMessage = ({ content, time, type }: TextMessageProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      } h-fit max-w-73.25 w-fit px-3 py-2.5 flex gap-2`}
    >
      <p className="leading-[1.3] text-balance">{content}</p>
      <p className="text-sm text-gray leading-[1.2] self-end">{time}</p>
    </div>
  );
};
