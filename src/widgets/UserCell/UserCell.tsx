"use client";

import React from "react";
import { UserAvatar, type AvatarProps } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus";

export type UserCellProps = {
  id: string | number;
  name: string;
  avatar: AvatarProps;
  onDelete?: (id: string | number) => void;
};

export function UserCell({ id, name, avatar, onDelete }: UserCellProps) {
  return (
    <div className="flex items-center justify-between py-1 px-2 transition-colors group">
      <div className="flex items-center gap-3">
        <UserAvatar avatar={avatar} size={10} variant="avatarOnly" />
        <span className="text-black">{name}</span>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 -mr-2"
          aria-label="Удалить"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M26 19V29H18V19H26ZM24.5 13H19.5L18.5 14H15V16H29V14H25.5L24.5 13ZM28 17H16V29C16 30.1 16.9 31 18 31H26C27.1 31 28 30.1 28 29V17Z" 
              fill="#7769E1"
            />
          </svg>
        </button>
      )}
    </div>
  );
}