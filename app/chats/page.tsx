"use client";

import React, { useState, ChangeEvent, useMemo, useCallback } from "react";
import { CreateButton } from "@/shared/ui/CreateButton/CreateButton"; 
import SearchInput from "@/shared/ui/SearchInput/SearchInput";
import MenuNavigation from "@/shared/ui/MenuNavigation/MenuNavigation";
import { ChatListItem } from "@widgets/ChatListItem/ui/ChatListItem";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { AddContactModal } from "@/shared/ui/AddContactModal/AddContactModal";
import { ChatHeader } from "@/widgets/СhatHeader/ChatHeader";

interface Chat {
  id: number; 
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
  const [deleteChatId, setDeleteChatId] = useState<number | null>(null); // Тип number
  const [addContactId, setAddContactId] = useState<number | null>(null); // Тип number
  const [activeChatId, setActiveChatId] = useState<number | null>(1); // Тип number

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Анна Павлова",
      avatarUrl: "i.pravatar.cc",
      lastMessage: "Привет. Я оставил две стремянки и два шуруповёрта...",
      timestamp: "10:45",
      isOnline: true,
      wasOnlineAt: Math.floor(Date.now() / 1000) - 300,
      isPinned: true,
      isMuted: false,
      unreadCount: 5,
    },
    {
      id: 2,
      name: "Влад Ляшев",
      avatarUrl: "i.pravatar.cc",
      lastMessage: "Все документы подписаны.",
      timestamp: "30.12.2023",
      isOnline: false,
      wasOnlineAt: Math.floor(Date.now() / 1000) - 86400,
      isPinned: false,
      isMuted: true,
      isSent: true,
      isRead: true,
      unreadCount: 0,
    },
    {
      id: 3,
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

  const activeChat = useMemo(() => 
    chats.find(c => c.id === activeChatId), 
    [activeChatId, chats]
  );

  const selectedDeleteChat = useMemo(() => 
    chats.find(c => c.id === deleteChatId), 
    [deleteChatId, chats]
  );
  
  const selectedAddChat = useMemo(() => 
    chats.find(c => c.id === addContactId), 
    [addContactId, chats]
  );

  // Разделение ответственности: простая смена boolean свойств
  const toggleBooleanProperty = useCallback((id: number, key: keyof Pick<Chat, 'isPinned' | 'isMuted'>) => {
    setChats((prev) => prev.map((chat) => 
      chat.id === id ? { ...chat, [key]: !chat[key] } : chat
    ));
  }, []);

  // Разделение ответственности: сложная логика статуса чтения
  const toggleReadStatus = useCallback((id: number) => {
    setChats((prev) => prev.map((chat) => {
      if (chat.id === id) {
        const isCurrentlyUnread = chat.unreadCount > 0 || !chat.isRead;
        return isCurrentlyUnread 
          ? { ...chat, isRead: true, unreadCount: 0, isSent: true }
          : { ...chat, isRead: false, unreadCount: 1, isSent: true };
      }
      return chat;
    }));
  }, []);

  const filteredAndSortedChats = useMemo(() => {
    return chats
      .filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [chats, searchQuery]);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <aside className="flex flex-col w-full max-w-[450px] border-r border-gray-light relative bg-white">
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

        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-gray-light">
          {filteredAndSortedChats.map((chat, index) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              id={String(chat.id)} // Преобразование для пропса компонента, если он ждет string
              onPinToggle={() => toggleBooleanProperty(chat.id, "isPinned")}
              onMuteToggle={() => toggleBooleanProperty(chat.id, "isMuted")}
              onReadToggle={() => toggleReadStatus(chat.id)}
              onDelete={() => setDeleteChatId(chat.id)} 
              onAddContact={() => setAddContactId(chat.id)}
              showDivider={index !== filteredAndSortedChats.length - 1}
              onClick={(id) => setActiveChatId(Number(id))}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-30 bg-white">
          <MenuNavigation />
        </div>
      </aside>

      

      {deleteChatId && (
        <ConfirmModal
          isOpen={true}
          title="Удалить чат"
          description={`Вы действительно хотите удалить чат с ${selectedDeleteChat?.name}?`}
          buttonsLayout="row"
          buttons={[
            { label: "Отмена", onClick: () => setDeleteChatId(null) },
            { 
              label: "Удалить", 
              onClick: () => {
                setChats(prev => prev.filter(c => c.id !== deleteChatId));
                setDeleteChatId(null);
                if (activeChatId === deleteChatId) setActiveChatId(null);
              } 
            },
          ]}
          onClose={() => setDeleteChatId(null)}
        />
      )}

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