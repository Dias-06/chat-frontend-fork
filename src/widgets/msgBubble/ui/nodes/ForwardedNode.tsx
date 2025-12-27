interface ForwardedNodeProps {
  avatarSrc: string;
  forwardedFrom: string;
  type: "sent" | "recieved";
  classFix: string;
}

export const ForwardedNode = ({
  avatarSrc,
  forwardedFrom,
  type,
  classFix,
}: ForwardedNodeProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      } ${classFix} h-fit w-full px-3 py-2.5 flex flex-col gap-0.5`}
    >
      <p className="text-sm leading-[1.2] text-violet-forwarded">
        Переслано от
      </p>
      <div className="flex items-center gap-0.5">
        <img
          className="w-4 h-4 flex-none rounded-full"
          src={avatarSrc}
          alt={`Аватар пользователя ${forwardedFrom}`}
        />
        <p className="text-sm leading-[1.3] text-primary font-bold">
          {forwardedFrom}
        </p>
      </div>
    </div>
  );
};
