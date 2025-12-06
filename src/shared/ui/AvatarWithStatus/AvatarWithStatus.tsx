"use client";
import React from "react";

export type UserAvatarVariant =
  | "avatarOnly" // только круглая картинка, без статуса
  | "avatarWithStatusBelow" // аватар сверху, статус снизу
  | "avatarWithStatusRight"; // аватар слева, статус справа

type AvatarProps = {
  /** URL аватара. Приоритет: avatar_webp_url > avatar_url > avatar_webp > avatar */
  avatar_webp_url?: string;
  avatar_url?: string;
  avatar_webp?: string;
  avatar?: string;
  /** Альтернативный текст для изображения */
  alt?: string;
};

type StatusProps = {
  /** Пользователь онлайн */
  is_online?: boolean;
  /** Время последнего визита (UNIX timestamp в секундах) */
  was_online_at?: number;
};

type UserAvatarProps = {
  /** Пропсы для аватара */
  avatar: AvatarProps;
  /** Пропсы для статуса */
  status?: StatusProps;
  /** Размер в абстрактных единицах. 1 ед. ≈ 4px (size=10 → ~40px). */
  size?: number;
  /** Вариант раскладки аватара и статуса. */
  variant?: UserAvatarVariant;
  /** Показывать ли строку статуса. */
  showStatus?: boolean;
  /** Скрыть аватар. */
  hideAvatar?: boolean;
  /** Состояние соединения. Если true, показывается "соединяемся". */
  isConnecting?: boolean;
};

function pickAvatarUrl(avatar: AvatarProps): string {
  return (
    avatar.avatar_webp_url ||
    avatar.avatar_url ||
    avatar.avatar_webp ||
    avatar.avatar ||
    ""
  );
}

function formatLastSeen(timestamp: number): string {
  if (!timestamp) return "недавно";

  const date = new Date(timestamp * 1000); // UNIX‑секунды
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs) || diffMs < 0) return "недавно";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "был(а) только что";
  if (diffMinutes < 60) return `был(а) ${diffMinutes} мин назад`;
  if (diffHours < 24) return `был(а) ${diffHours} ч назад`;
  if (diffDays === 1) return "был(а) вчера";
  if (diffDays < 7) return `был(а) ${diffDays} дн назад`;

  return `был(а) ${date.toLocaleDateString()}`;
}

function getStatusText(status: StatusProps | undefined, isConnecting?: boolean): string {
  if (isConnecting) return "соединение...";
  if (!status) return "";
  if (status.is_online) return "в сети";
  return formatLastSeen(status.was_online_at || 0);
}

export function UserAvatar({
  avatar,
  status,
  size = 10,
  variant = "avatarWithStatusBelow",
  showStatus = true,
  hideAvatar = false,
  isConnecting = false,
}: UserAvatarProps) {
  const src = pickAvatarUrl(avatar);
  const px = size * 4;
  const dimension = `${px}px`;

  const statusText = getStatusText(status, isConnecting);
  const shouldShowStatus = showStatus && variant !== "avatarOnly" && statusText;

  const avatarElement = hideAvatar ? null : (
    <div
      className="overflow-hidden rounded-full bg-slate-200"
      style={{ width: dimension, height: dimension }}
    >
      {src ? (
        <img
          src={src}
          alt={avatar.alt || ""}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
          ?
        </div>
      )}
    </div>
  );

  const statusElement =
    shouldShowStatus && statusText ? (
      <span
        className={
          isConnecting
            ? "text-sm text-blue-500"
            : status?.is_online
              ? "text-sm text-violet-600"
              : "text-sm text-slate-400"
        }
      >
        {statusText}
      </span>
    ) : null;

  if (variant === "avatarOnly") {
    return <div className="inline-flex">{avatarElement}</div>;
  }

  // Обработка варианта "avatarWithStatusRight"
  if (variant === "avatarWithStatusRight") {
    // Если аватар скрыт, в этом режиме показываем только статус
    if (hideAvatar) {
      return <div className="inline-flex">{statusElement}</div>;
    }
    return (
      <div className="flex items-end gap-3">
        {avatarElement}
        {statusElement}
      </div>
    );
  }

  // Если аватар скрыт, показываем только статус (для варианта avatarWithStatusBelow по умолчанию)
  if (hideAvatar) {
    return <div className="inline-flex">{statusElement}</div>;
  }

  // Вариант по умолчанию: avatarWithStatusBelow (вертикальное расположение)
  return (
    <div className="inline-flex flex-col items-center gap-1">
      {avatarElement}
      {statusElement}
    </div>
  );
}
