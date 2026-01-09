"use client";

import React, { useState, ChangeEvent, useMemo, useCallback } from "react";
import { CreateButton } from "@/shared/ui/CreateButton/CreateButton"; 
import SearchInput from "@/shared/ui/SearchInput/SearchInput";
import MenuNavigation from "@/shared/ui/MenuNavigation/MenuNavigation";
import { ChatListItem } from "@widgets/ChatListItem/ui/ChatListItem";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { AddContactModal } from "@/shared/ui/AddContactModal/AddContactModal";

interface Chat {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  wasOnlineAt?: number;
  isPinned: boolean;
  isMuted: boolean;
  unreadCount: number;
  isSent?: boolean;
  isRead?: boolean;
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Состояния для открытия модалок
  const [deleteChatId, setDeleteChatId] = useState<string | null>(null);
  const [addContactId, setAddContactId] = useState<string | null>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Анна Павлова",
      avatarUrl: "i.pravatar.cc",
      lastMessage: "Привет. Я оставил две стремянки и два шуруповёрта. Один в кейсе, а другой просто так. Одна батарейка может кончиться, тогда будете одним добивать. Воды с собой возьмите, там ничего уже не осталось.",
      timestamp: "10:45",
      isOnline: true,
      isPinned: true,
      isMuted: false,
      unreadCount: 5,
    },
    {
      id: "2",
      name: "Влад Ляшев",
      avatarUrl: "i.pravatar.cc",
      lastMessage: "Все документы подписаны.",
      timestamp: "30.12.2023",
      isOnline: false,
      isPinned: false,
      isMuted: true,
      isSent: true,
      isRead: true,
      unreadCount: 0,
    },
    {
      id: "3",
      name: "Мария Петрова",
      avatarUrl: "i.pravatar.cc",
      lastMessage: "Воды с собой возьмите, там ничего не осталось.",
      timestamp: "12:30",
      isOnline: true,
      isPinned: false,
      isMuted: false,
      isSent: true,
      isRead: false,
      unreadCount: 0,
    }
  ]);

  // Находим объект чата для отображения в модалке (имя и т.д.)
  const selectedDeleteChat = useMemo(() => 
    chats.find(c => String(c.id) === String(deleteChatId)), 
    [deleteChatId, chats]
  );
  
  const selectedAddChat = useMemo(() => 
    chats.find(c => String(c.id) === String(addContactId)), 
    [addContactId, chats]
  );

  // Изменение свойств (закреп, звук, прочтение)
  const toggleProperty = useCallback((id: string, key: keyof Chat) => {
    setChats((prev) => prev.map((chat) => {
      if (String(chat.id) === String(id)) {
        if (key === "isRead") {
          const isCurrentlyUnread = chat.unreadCount > 0 || !chat.isRead;
          return isCurrentlyUnread 
            ? { ...chat, isRead: true, unreadCount: 0, isSent: true }
            : { ...chat, isRead: false, unreadCount: 1, isSent: true };
        }
        return { ...chat, [key]: !chat[key] };
      }
      return chat;
    }));
  }, []);

  // Поиск и сортировка
  const filteredAndSortedChats = useMemo(() => {
    return chats
      .filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [chats, searchQuery]);

  return (
    <div className="flex flex-col h-screen max-w-[450px] mx-auto bg-white border-x border-gray-light shadow-2xl relative overflow-hidden">
      
      {/* HEADER */}
      <div className="p-4 flex items-center gap-3 bg-gray-light z-20">
        <div className="flex-1">
          <SearchInput 
            theme="light"
            height="44px"
            value={searchQuery} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} 
            placeholder="Поиск"
          />
        </div>
        <CreateButton />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-gray-light">
        {filteredAndSortedChats.map((chat, index) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            onPinToggle={() => toggleProperty(chat.id, "isPinned")}
            onMuteToggle={() => toggleProperty(chat.id, "isMuted")}
            onReadToggle={() => toggleProperty(chat.id, "isRead")}
            onDelete={() => setDeleteChatId(chat.id)} 
            onAddContact={() => setAddContactId(chat.id)}
            showDivider={index !== filteredAndSortedChats.length - 1}
            onClick={(id) => console.log("Переход в чат:", id)}
          />
        ))}
      </div>

      {/* NAVIGATION */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white">
        <MenuNavigation />
      </div>

      {/* MODALS SECTION */}
      
      {/* Модалка удаления чата */}
      {deleteChatId && (
        <ConfirmModal
          isOpen={true}
          title="Удалить чат"
          description={`Вы действительно хотите удалить чат с ${selectedDeleteChat?.name} без возможности восстановления?`}
          buttons={[
            { 
              label: "Отмена", 
              onClick: () => {
                console.log("Клик: Отмена");
                setDeleteChatId(null);
              }
            },
            { 
              label: "Удалить", 
              onClick: () => {
                console.log("Клик: Удалить ID", deleteChatId);
                setChats((prev) => prev.filter((chat) => String(chat.id) !== String(deleteChatId)));
                setDeleteChatId(null);
              } 
            },
          ]}
          buttonsLayout="row"
          onClose={() => setDeleteChatId(null)}
        />
      )}

      {/* Модалка добавления контакта */}
      {addContactId && (
        <AddContactModal 
          isOpen={true} 
          userName={selectedAddChat?.name || ""} 
          onClose={() => setAddContactId(null)} 
        />
      )}
    </div>
  );
}