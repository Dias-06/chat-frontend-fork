"use client";

import { useEffect } from "react";
import { AddContactModalProps, AddContactModalSpacing } from "./AddContactModal.types";

type SpacingPreset = {
  titleMargin: string;
  checkedMargin?: string;
};

const spacingMap: Record<AddContactModalSpacing, SpacingPreset> = {
  compact: { titleMargin: "mt-4 mb-2" },
  default: { titleMargin: "mt-6 mb-2" },
  checked: { titleMargin: "mt-4", checkedMargin: "mt-8" }, // Увеличили верхний отступ для галочки
};

export const AddContactModal = ({
  isOpen,
  userName,
  spacing = "checked",
  onClose,
}: AddContactModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
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
        {/*Галочка */}
        <div className={`${preset.checkedMargin || "mt-6"} mb-4`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7769E1]/10">
            <svg width="52" height="52" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.6667 0C9.70667 0 0 9.70667 0 21.6667C0 33.6267 9.70667 43.3333 21.6667 43.3333C33.6267 43.3333 43.3333 33.6267 43.3333 21.6667C43.3333 9.70667 33.6267 0 21.6667 0ZM17.3333 32.5L6.5 21.6667L9.555 18.6117L17.3333 26.3683L33.7783 9.92333L36.8333 13L17.3333 32.5Z" fill="#7769E1"/>
              <path d="M17.3333 32.5L6.5 21.6667L9.555 18.6117L17.3333 26.3683L33.7783 9.92333L36.8333 13L17.3333 32.5Z" fill="white"/>
              </svg>
          </div>
        </div>

        {/* 2. Имя пользователя */}
        <h3 className="text-center text-xl font-medium leading-tight text-black">
          {userName}
        </h3>

        {/* 3. Текст о добавлении */}
        <p className="mt-2 text-center text-sm text-black">
          теперь в вашем списке контактов
        </p>
      </div>
    </div>
  );
};