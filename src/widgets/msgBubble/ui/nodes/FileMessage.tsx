import { ReactNode } from "react";
import { FileIcon } from "./icons/FileIcon";
import { LoadingIcon } from "./icons/LoadingIcon";

interface FileMessageProps {
  fileName: string;
  size: number;
  time: string;
  previewSrc?: string | null;
  isLoading?: boolean;
  type: "sent" | "recieved";
  sentIcon: ReactNode;
}

export const FileMessage = ({
  fileName,
  size,
  time,
  previewSrc = null,
  isLoading = true,
  type,
  sentIcon,
}: FileMessageProps) => {
  return (
    <div
      className={`${
        type === "sent" ? "bg-secondary-light" : "bg-white"
      } max-w-73.25 h-fit px-3 py-2.5 flex gap-1.5`}
    >
      <div className="w-full flex items-center gap-3">
        {previewSrc ? (
          <img
            alt="preview"
            className="flex-none rounded w-12 h-12 object-cover"
            src={previewSrc}
          />
        ) : isLoading ? (
          <LoadingIcon className="flex-none" />
        ) : (
          <FileIcon className="flex-none" />
        )}
        <div className="max-w-52.25 flex flex-col gap-0.5 min-w-0">
          <p className="leading-[1.3] truncate max-w-full">{fileName}</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray leading-[1.2]">{size} МБ</p>
            <div className="flex gap-0.5">
              <p className="text-sm text-gray leading-[1.2]">{time}</p>
              {type === "sent" && sentIcon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
