import { FileIcon } from "./icons/FileIcon";
import { FileLoaderIcon } from "./icons/FileLoaderIcon";

interface FileMessageProps {
  fileName: string;
  size: number;
  time: string;
  previewSrc?: string | null;
  isLoading?: boolean;
  type: "sent" | "recieved";
}

export const FileMessage = ({
  fileName,
  size,
  time,
  previewSrc = null,
  isLoading = true,
  type,
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
          <FileLoaderIcon className="flex-none" />
        ) : (
          <FileIcon className="flex-none" />
        )}
        <div className="max-w-52.25 flex flex-col gap-0.5 min-w-0">
          <p className="leading-[1.3] truncate max-w-full">{fileName}</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray leading-[1.2]">{size} МБ</p>
            <p className="text-sm text-gray leading-[1.2]">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
