"use client";

import { TogglerIcon } from "./icons/Toggler";

export const NotificationsToggler = ({
  active = true,
  onClick,
}: TogglerProps) => {
  return (
    <div className="p-4 flex gap-2 items-center justify-between">
      <p className="text-black leading-[1.3]">Уведомления</p>
      <button type="button" onClick={onClick}>
        <TogglerIcon active={active} />
      </button>
    </div>
  );
};
