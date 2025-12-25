interface answerNodeProps {
  person: string;
  content: string;
  previewSrc?: string;
  type: "sent" | "recieved";
}

export const AnswerNode = ({
  person,
  content,
  previewSrc,
  type,
}: answerNodeProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      } px-3 py-2.5`}
    >
      <div
        className={`${
          type === "sent" ? "bg-white/50" : "bg-violet-secondary"
        } rounded border-l-[4px] border-l-primary pt-1 pr-[10px] pb-1 pl-[10px] flex gap-1 items-center`}
      >
        {previewSrc && (
          <img
            src={previewSrc}
            alt="preview"
            className="rounded h-9.25 w-9.25 object-cover"
          />
        )}
        <div className="w-full flex flex-col gap-0.5">
          <p className="font-bold text-sm leading-[1.3] text-primary">
            {person}
          </p>
          <p className="w-full text-sm text-gray truncate">
            {previewSrc ? "Photo" : content}
          </p>
        </div>
      </div>
    </div>
  );
};
