export type AddContactModalSpacing = "default" | "compact" | "checked";

export type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string; // <-- Пропс для динамического имени
  spacing?: AddContactModalSpacing;
};