import { ReadIcon } from "./icons/ReadIcon";
import { SendingIcon } from "./icons/SendingIcon";
import { UnreadIcon } from "./icons/UnreadIcon";

interface MessageStatusNodeProps {
  status: "sending" | "unread" | "read" | undefined;
  isOverlay?: boolean;
}

export const MessageStatusNode = ({
  status,
  isOverlay,
}: MessageStatusNodeProps) => {
  if (status === undefined) return null;
  if (status === "sending") return <SendingIcon isOverlay={isOverlay} />;
  if (status === "unread") return <UnreadIcon isOverlay={isOverlay} />;
  if (status === "read") return <ReadIcon />;
};
