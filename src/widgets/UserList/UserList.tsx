"use client";

import React from "react";
import { UserCell } from "@/widgets/UserCell/UserCell";
import { type AvatarProps } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus";

interface UserListProps {
  users: {
    id: string | number;
    name: string;
    avatar: AvatarProps;
  }[];
  onDelete?: (id: string | number) => void; 
}

export function UserList({ users, onDelete }: UserListProps) {
  return (
    <div className="flex flex-col bg-white pb-4">
      {users.map((user) => (
        // Используем relative и after: для создания линии с отступами
        <div 
          key={user.id} 
          className="relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray/10"
        >
          <UserCell
            {...user}
            onDelete={onDelete}
          />
        </div>
      ))}
      {users.length === 0 && (
          <p className="p-10 text-center text-black">Список пуст</p>
      )}
    </div>
  );
}