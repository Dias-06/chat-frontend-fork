"use client";
import React from "react";
import { UserAvatar } from "@/shared/ui/AvatarWithStatus/AvatarWithStatus"; 
import { ContextMenu } from "@/shared/ui/ContextMenu/ContextMenu"; 
import { ContextMenuItem } from "@/shared/ui/ContextMenu/ContextMenuItem";

type ChatListItemProps = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline: boolean;
  wasOnlineAt?: number;
  isActive?: boolean; 
  isRead?: boolean;   
  isPinned?: boolean; 
  isMuted?: boolean; 
  isSent?: boolean; 
  showDivider?: boolean; 
  onClick?: (id: string) => void;
};

export const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline,
  wasOnlineAt,
  isActive = false,
  isRead = false,
  isPinned = false,
  isMuted = false,
  isSent = false, 
  showDivider = true,
  onClick,
}) => {
  
  // Данные для аватара
  const avatarData = { avatar_url: avatarUrl, alt: name };
  const statusData = { is_online: isOnline, was_online_at: wasOnlineAt };

  const menuItems = (
    <>
      <ContextMenuItem iconName="Plus" onClick={() => console.log('Добавить в контакты', id)}>
        Добавить в контакты
      </ContextMenuItem>
      
      <ContextMenuItem iconName={isMuted ? "BellOn" : "BellOff"} onClick={() => console.log('Переключить уведомления', id)}>
        {isMuted ? "Включить уведомления" : "Выключить уведомления"}
      </ContextMenuItem>
      
      <ContextMenuItem iconName="PinOff" onClick={() => console.log('Закреп/Откреп', id)}>
        {isPinned ? "Открепить чат" : "Закрепить чат"}
      </ContextMenuItem>
      
      <ContextMenuItem 
        iconName={isRead ? "MessageUnread" : "MessageRead"} 
        onClick={() => console.log('Сменить статус прочтения', id)}
      >
        {isRead ? "Пометить непрочитанным" : "Пометить прочитанным"}
      </ContextMenuItem>

      <ContextMenuItem iconName="Trash" onClick={() => console.log('Удалить чат', id)}>
        Удалить чат
      </ContextMenuItem>
    </>
  );

  return (
    <ContextMenu items={menuItems}>
      <div className="px-2 py-0.5"> 
        <div 
          onClick={() => onClick?.(id)}
          className={`
            group flex items-center p-3 cursor-pointer transition-all duration-200 select-none rounded-xl 
            hover:bg-cyan hover:shadow-lg active:scale-[0.98]
            
            /* Белый фон только у закрепленных, активный статус управляется извне */
            ${isPinned ? "bg-white shadow-sm" : "bg-transparent shadow-none"}
            
            relative after:absolute after:bottom-0 after:left-16 after:right-4 after:h-[1px] 
            after:bg-gray-light ${(isPinned || !showDivider) ? "after:hidden" : "group-hover:after:hidden"}
          `}
        >
          <UserAvatar 
            avatar={avatarData} 
            status={statusData} 
            size={12} 
            variant="avatarOnly" 
          />
          
          <div className="flex-1 ml-3 min-w-0">
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5 min-w-0">
                <h4 className="text-sm font-semibold truncate text-black leading-tight">{name}</h4>
                {isMuted && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.53148 1.71216L1.70898 2.53466L4.25232 5.07799L4.08315 5.25299H1.74982V8.75299H4.08315L6.99982 11.6697V7.82549L9.43815 10.2638C9.05898 10.5497 8.63315 10.7772 8.16648 10.9113V12.113C8.94815 11.938 9.66565 11.5763 10.2723 11.0922L11.4682 12.288L12.2907 11.4655L2.53148 1.71216ZM5.83315 8.85216L4.56732 7.58632H2.91648V6.41966H4.56732L5.08065 5.90632L5.83315 6.65882V8.85216ZM11.0832 7.00299C11.0832 7.48132 10.9957 7.94216 10.844 8.36799L11.7365 9.26049C12.0632 8.57799 12.2498 7.81382 12.2498 7.00299C12.2498 4.50632 10.5057 2.41799 8.16648 1.88716V3.08882C9.85232 3.59049 11.0832 5.15382 11.0832 7.00299ZM6.99982 2.33632L5.90315 3.43299L6.99982 4.52966V2.33632ZM9.62482 7.00299C9.62482 5.97049 9.02982 5.08382 8.16648 4.65216V5.69632L9.61315 7.14299C9.61898 7.09632 9.62482 7.04966 9.62482 7.00299Z" fill="gray"/>
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1.5 ml-2 shrink-0">
                {isPinned && (
                  <span className="opacity-40">
                    <svg width="18" height="18" viewBox="0 0 25 18" fill="none">
                      <path d="M17.8041 5.81801L15.1525 8.46966C14.5585 9.06363 14.2032 9.81139 14.0918 10.591L10.9098 7.409C11.7106 7.29763 12.4478 6.9317 13.0311 6.34834L15.6828 3.69669L17.8041 5.81801ZM20.4558 6.34834L15.1525 1.04504C14.8608 0.753354 14.3835 0.753354 14.0918 1.04504C13.8001 1.33672 13.8001 1.81401 14.0918 2.1057L14.6221 2.63603L11.9705 5.28768C11.0901 6.16802 9.66884 6.16802 8.7885 5.28768L7.72784 6.34834L10.8939 9.51441L7.1816 13.2267V14.2874H8.24226L11.9546 10.5751L15.1525 13.773L16.2131 12.7123C15.3328 11.8319 15.3328 10.4107 16.2131 9.53032L18.8648 6.87867L19.3951 7.409C19.6868 7.70068 20.1641 7.70068 20.4558 7.409C20.7474 7.11731 20.7474 6.64002 20.4558 6.34834Z" fill="#747474"/>
                    </svg>
                  </span>
                )}
                {timestamp && <span className="text-xs text-gray whitespace-nowrap">{timestamp}</span>}
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-1">
              <p className="text-sm text-gray leading-snug line-clamp-2 flex-1 mr-2 min-h-[34px]">
                {lastMessage || "Нет сообщений"}
              </p>
              
              <div className="flex items-center shrink-0 mb-1">
                {isRead ? (
                  /* Двойная фиолетовая галочка (Прочитано) */
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4796 3.91124L9.65708 3.08875L5.95875 6.78708L6.78125 7.60958L10.4796 3.91124ZM12.9529 3.08875L6.78125 9.26041L4.34292 6.82791L3.52042 7.65041L6.78125 10.9112L13.7812 3.91124L12.9529 3.08875ZM0.21875 7.65041L3.47958 10.9112L4.30208 10.0887L1.04708 6.82791L0.21875 7.65041Z" fill="#7763E4"/>
                  </svg>
                ) : isSent ? (
                  /* Серая одинарная галочка (Отправлено пользователем) */
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7L6 10L11 4" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  /* Фиолетовый кружок (Входящее непрочитанное) */
                  unreadCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContextMenu>
  );
};