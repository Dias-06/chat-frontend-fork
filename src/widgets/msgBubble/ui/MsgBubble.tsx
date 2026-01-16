import { MessageStatusNode } from "./MessageStatusNode";
import { AnswerNode } from "./nodes/AnswerNode";
import { FileMessage } from "./nodes/FileMessage";
import { ForwardedNode } from "./nodes/ForwardedNode";
import { ImagesMessage } from "./nodes/ImagesMessage";
import { ImagesNode } from "./nodes/ImagesNode";
import { TextMessage } from "./nodes/TextMessage";
import { VoiceMessage } from "./nodes/VoiceMessage";

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
  status?: "sending" | "unread" | "read";
  audioSrc?: string;
  audioDuration?: string;
  stopLoading?: () => void;
  onClick?: () => void;
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
  status,
  audioSrc,
  audioDuration,
  stopLoading,
  onClick,
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
      {images && content && (
        <ImagesMessage
          images={images}
          time={time}
          sentIcon={<MessageStatusNode status={status} isOverlay />}
        />
      )}
      {content && (
        <TextMessage
          content={content}
          time={time}
          type={type}
          sentIcon={<MessageStatusNode status={status} />}
          classFix={!images && (answerContent || forwardedFrom) ? "pt-0" : ""}
        />
      )}

      {fileName && size && stopLoading && onClick && (
        <FileMessage
          fileName={fileName}
          size={size}
          time={time}
          previewSrc={previewSrc}
          isLoading={isLoading}
          type={type}
          sentIcon={<MessageStatusNode status={status} />}
          stopLoading={stopLoading}
          onClick={onClick}
        />
      )}
      {audioSrc && audioDuration && stopLoading && (
        <VoiceMessage
          isLoading={isLoading ?? false}
          audioSrc={audioSrc}
          duration={audioDuration}
          time={time}
          type={type}
          sentIcon={<MessageStatusNode status={status} />}
          waveform={[
            5, 12, 7, 2, 14, 8, 16, 3, 10, 6, 2, 17, 9, 11, 4, 7, 15, 6, 8, 13,
            3, 12, 14, 5, 9, 2, 17, 10, 6, 11, 8,
          ]}
          stopLoading={stopLoading}
        />
      )}
    </div>
  );
};
