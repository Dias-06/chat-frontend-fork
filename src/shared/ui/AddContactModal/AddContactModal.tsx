"use client";

import { useEffect } from "react";
import { CheckMark } from "@/shared/assets/icons/CheckMark";
import { AddContactModalProps, AddContactModalSpacing } from "./AddContactModal.types";

type SpacingPreset = {
  titleMargin: string;
  checkedMargin?: string;
};

const spacingMap: Record<AddContactModalSpacing, SpacingPreset> = {
  compact: { titleMargin: "mt-4 mb-2" },
  default: { titleMargin: "mt-6 mb-2" },
  checked: { titleMargin: "mt-4", checkedMargin: "mt-8" },
};

export const AddContactModal = ({
  isOpen,
  userName,
  spacing = "checked",
  onClose,
}: AddContactModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const preset = spacingMap[spacing];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Оверлей */}
      <div
        className="fixed inset-0 bg-overlay blur-sm opacity-40 cursor-pointer"
        onClick={onClose}
      />

      <div
        className="relative z-10 mx-8 w-full max-w-[330px] rounded-3xl bg-white px-6 pb-10 pt-2 shadow-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Иконка */}
        <div className={`${preset.checkedMargin || "mt-6"} mb-4`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7769E1]/10">
            <CheckMark width={52} height={52} />
          </div>
        </div>

        {/* Имя пользователя */}
        <h3 className="text-center text-xl font-medium leading-tight text-black">
          {userName}
        </h3>

        {/* Текст о добавлении */}
        <p className="mt-2 text-center text-sm text-black">
          теперь в вашем списке контактов
        </p>
      </div>
    </div>
  );
};