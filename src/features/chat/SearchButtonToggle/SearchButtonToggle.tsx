// src/features/chat/SearchButtonToggle/SearchButtonToggle.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchInput from "@/shared/ui/SearchInput/SearchInput";
import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import classNames from "classnames";

export const SearchButtonToggle = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 💡 1. Создаем рефы для контейнера и поля ввода
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 💡 2. Логика для сворачивания
  const handleCollapse = useCallback(() => {
    setIsSearching(false);
    setSearchText("");
  }, []);

  // 💡 3. Обработчик клика вне элемента (Click Outside)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Если isSearching = true И клик был НЕ внутри нашего контейнера
      if (
        isSearching &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCollapse();
      }
    };

    // Добавляем слушатель, когда isSearching = true
    document.addEventListener("mousedown", handleClickOutside);

    // Удаляем слушатель при размонтировании или изменении isSearching
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching, handleCollapse]); // Зависимость от isSearching и handleCollapse

  // 💡 4. Управление логикой открытия
  const handleToggle = useCallback(() => {
    const newState = !isSearching;
    setIsSearching(newState);

    if (!newState) {
      setSearchText(""); // Очищаем при закрытии
    }

    if (newState && inputRef.current) {
      // Фокусируемся
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isSearching]);

  // 💡 5. Логика очистки текста
  const handleClear = useCallback(() => {
    setSearchText("");
    inputRef.current?.focus();
  }, []);

  // Общие классы контейнера для анимации ширины
  const containerClasses = classNames(
    "relative flex items-center border-[1.5px] border-primary h-11 transition-all duration-300",
    {
      "w-11 rounded-full justify-center bg-white text-black": !isSearching,
      "w-full bg-white rounded-lg": isSearching,
    }
  );

  if (!isSearching) {
    // --- СОСТОЯНИЕ: СКРЫТО (КРУГЛАЯ КНОПКА) ---
    return (
      <button
        onClick={handleToggle}
        className={containerClasses}
        aria-label="Начать поиск в чате"
      >
        <CiSearch size={20} />
      </button>
    );
  }

  // --- СОСТОЯНИЕ: РАСКРЫТО (ПОЛЕ ВВОДА) ---
  return (
    <div ref={containerRef} className={containerClasses}>
      {/* 🔍 Иконка поиска слева */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
        <CiSearch size={20} />
      </div>

      {/* 📝 Сам инпут */}
      <input
        ref={inputRef}
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={classNames(
          "w-full h-full outline-none bg-transparent transition-colors duration-200",
          "pl-10 pr-10 text-base"
        )}
        placeholder="Поиск по этому чату..."
      />

      {/* ❌ Кнопка "Очистить" */}
      {searchText.length > 0 && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 z-10 p-1"
          aria-label="Очистить поиск"
        >
          <RxCross1 size={20} />
        </button>
      )}
    </div>
  );
};
