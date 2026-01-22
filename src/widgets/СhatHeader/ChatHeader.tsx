import React from "react";
import { UserAvatar, type AvatarProps, type StatusProps } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus";
import { BackIcon } from "@/shared/assets/icons/BackIcon";
import { CallButton } from "@/shared/ui/CallButton/CallButton";

interface ChatHeaderProps {
  userName: string;
  avatar: AvatarProps;
  status?: StatusProps;
  isConnecting?: boolean;
  onBackClick?: () => void;
  onCallClick?: () => void;
}

const HeaderBackground = () => (
  <svg
    width="100%"
    height="90"
    viewBox="0 0 393 90"
    fill="none"
    xmlns="www.w3.org"
    preserveAspectRatio="none"
    className="absolute inset-0 z-0 pointer-events-none"
  >
    <path d="M0 0H393V90H0V0Z" fill="white" />
    <path
      d="M314.201 32C314.201 14.3269 299.874 0 282.2 0H32C14.3269 0 0 14.3269 0 32V78H346.119C328.491 78 314.201 63.6729 314.201 46V32Z"
      fill="#D6D2F6"
    />
    <path d="M0 78H381C387.627 78 393 83.3726 393 90H0V78Z" fill="#D6D2F6" />
  </svg>
);

export function ChatHeader({
  userName,
  avatar,
  status,
  isConnecting,
  onBackClick,
  onCallClick,
}: ChatHeaderProps) {
  return (
    <header className="relative flex h-[90px] w-full flex-col overflow-hidden">
      <HeaderBackground />

      {/* Контейнер контента */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        
        {/* Левая часть (весь блок с кнопкой Назад, Аватаром, Именем и Статусом) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackClick}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors active:bg-black/10"
            aria-label="Назад"
          >
            <BackIcon size={24} color="#1C1C1E" />
          </button>

          {/* Блок аватара и информации - делаем его relative */}
          <div className="relative flex items-center gap-3">
            <UserAvatar avatar={avatar} size={10} variant="avatarOnly" />
            
            <div className="flex flex-col">
              <span className="max-w-[160px] truncate text-base font-bold leading-tight text-black">
                {userName}
              </span>
              <UserAvatar
                avatar={avatar}
                status={status}
                isConnecting={isConnecting}
                hideAvatar={true}
                showStatus={true}
                variant="avatarWithStatusRight"
                statusTextClassName="text-sm text-gray"
              />
            </div>

            {/* Серая полоска, привязанная к этому блоку */}
            <div className="absolute bottom-[-10px] left-[-10px] h-px w-[200px] bg-black/30" />
          </div>

        </div>

        {/* Правая часть (кнопка звонка) */}
        <CallButton onClick={onCallClick} />

      </div>
    </header>
  );
}