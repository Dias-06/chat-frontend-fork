export type ConfirmModalSpacing = "default" | "compact" | "checked";

type SpacingPreset = {
  titleMargin: string;
  subtitleMargin?: string;
  checkedMargin?: string;
};

export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  description2?: string;
  checkedDescription?: string;
  buttons?: {
    label: string;
    onClick: () => void;
  }[];
  buttonsLayout?: "row" | "column";
  spacing?: ConfirmModalSpacing;
  defaultSpacingOverride?: Partial<SpacingPreset>;
  onClose?: () => void;
};
