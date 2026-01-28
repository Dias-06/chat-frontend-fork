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
    <div className="flex flex-col overflow-hidden">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="relative px-4 py-2 last:after:hidden after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1px] after:bg-gray/10"
        >
          <UserCell
            {...user}
            onDelete={onDelete}
            avatarSize={12} 
          />
        </div>
      ))}
      
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-black">
          <p className="text-sm">Список пуст</p>
        </div>
      )}
    </div>
  );
}