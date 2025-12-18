"use client";

import { useEffect } from "react";
import { Button } from "../Button";
import { ConfirmModalProps, ConfirmModalSpacing } from "./ConfirmModal.types";

type SpacingPreset = {
  titleMargin: string;
  subtitleMargin?: string;
  checkedMargin?: string;
};

const spacingMap: Record<ConfirmModalSpacing, SpacingPreset> = {
  compact: {
    titleMargin: "mt-8 mb-6",
  },
  default: {
    titleMargin: "mt-9",
    subtitleMargin: "mt-2 mb-5",
  },
  checked: {
    titleMargin: "mt-5",
    subtitleMargin: "mt-2",
    checkedMargin: "my-4",
  },
};

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  description2,
  checkedDescription,
  buttons,
  buttonsLayout = "column",
  spacing = "default",
  defaultSpacingOverride,
  onClose,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const basePreset = spacingMap[spacing];

  const spacingPreset =
    spacing === "default" && defaultSpacingOverride
      ? { ...basePreset, ...defaultSpacingOverride }
      : basePreset;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 m-4 rounded-lg bg-overlay"
        onClick={() => onClose?.()}
      />

      <div
        className="relative z-10 mx-8 w-full max-w-[400px] rounded-2xl bg-white px-5 pb-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className={`${spacingPreset.titleMargin} text-center text-lg font-medium leading-[1.2]`}
        >
          {title}
        </h3>

        {(description || description2) && (
          <div
            className={`${spacingPreset.subtitleMargin} space-y-1 text-center text-base leading-[1.3] text-gray`}
          >
            {description && <p>{description}</p>}
            {description2 && <p>{description2}</p>}
          </div>
        )}

        {checkedDescription && (
          <div
            className={`${spacingPreset.checkedMargin} flex items-center justify-center gap-2 text-sm text-gray`}
          >
            <span className="flex h-6 w-6  items-center justify-center rounded-full bg-primary">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 0C4.8384 0 0 4.8384 0 10.8C0 16.7616 4.8384 21.6 10.8 21.6C16.7616 21.6 21.6 16.7616 21.6 10.8C21.6 4.8384 16.7616 0 10.8 0ZM8.64 16.2L3.24 10.8L4.7628 9.2772L8.64 13.1436L16.8372 4.9464L18.36 6.48L8.64 16.2Z"
                  fill="#7769E1"
                />
              </svg>
            </span>
            <p>{checkedDescription}</p>
          </div>
        )}

        {buttons && (
          <div
            className={`flex gap-2 ${
              buttonsLayout === "row" ? "flex-row" : "flex-col"
            }`}
          >
            {buttons.map((btn, index) => (
              <Button
                key={index}
                full
                size="lg"
                variant={
                  buttonsLayout === "row"
                    ? index === 0
                      ? "secondary"
                      : "primary"
                    : index === 0
                    ? "primary"
                    : "secondary"
                }
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
