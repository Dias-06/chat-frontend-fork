import { AnswerNode } from "./nodes/AnswerNode";
import { FileMessage } from "./nodes/FileMessage";
import { ForwardedNode } from "./nodes/ForwardedNode";
import { ImagesMessage } from "./nodes/ImagesMessage";
import { ImagesNode } from "./nodes/ImagesNode";
import { TextMessage } from "./nodes/TextMessage";

interface MessageBubbleProps {
  time: string;
  type: "sent" | "recieved";
  content?: string;
  fileName?: string;
  answerContent?: string;
  images?: string[];
  size?: number;
  previewSrc?: string;
  forwardedFrom?: string;
  avatarSrc?: string;
  isLoading?: boolean;
  person?: string;
}

export const MessageBubble = ({
  time,
  type,
  content,
  fileName,
  answerContent,
  images,
  size,
  previewSrc,
  forwardedFrom,
  avatarSrc,
  isLoading,
  person,
}: MessageBubbleProps) => {
  return (
    <div
      className={`${
        type === "sent"
          ? "rounded-2xl rounded-br-[4px]"
          : "rounded-2xl rounded-bl-[4px]"
      } overflow-hidden max-w-57 w-fit h-fit`}
    >
      {forwardedFrom && avatarSrc && (
        <ForwardedNode
          forwardedFrom={forwardedFrom}
          avatarSrc={avatarSrc}
          type={type}
          classFix={!images ? "pb-1.5" : ""}
        />
      )}
      {answerContent && person && (
        <AnswerNode
          person={person}
          content={answerContent}
          type={type}
          classFix={!images ? "pb-1.5" : ""}
        />
      )}
      {images && !content && <ImagesNode images={images} />}
      {images && content && <ImagesMessage images={images} time={time} />}
      {content && (
        <TextMessage
          content={content}
          time={time}
          type={type}
          classFix={!images && (answerContent || forwardedFrom) ? "pt-0" : ""}
        />
      )}

      {fileName && size && (
        <FileMessage
          fileName={fileName}
          size={size}
          time={time}
          previewSrc={previewSrc}
          isLoading={isLoading}
          type={type}
        />
      )}
    </div>
  );
};
