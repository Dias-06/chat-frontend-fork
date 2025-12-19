"use client";
import React, { 
  useState, 
  useEffect, 
  useRef, 
  ReactNode, 
  MouseEvent, 
  useCallback, 
  Children, 
  isValidElement, 
  cloneElement,
  Fragment 
} from "react";

interface ContextMenuProps {
  children: ReactNode;
  items: ReactNode;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ children, items }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setVisible(false), []);

  // --- ЛОГИКА АВТО-РАЗДЕЛИТЕЛЕЙ И АВТО-ЗАКРЫТИЯ ---
  const flatItems = Children.toArray(items).flatMap((child) => {
    if (isValidElement(child)) {
      const element = child as React.ReactElement<{ children?: ReactNode }>;
      if (element.type === Fragment) {
        return Children.toArray(element.props.children);
      }
    }
    return child;
  });

  const itemsWithDividers = flatItems.map((child, index) => {
    if (isValidElement(child)) {
      const isLast = index === flatItems.length - 1;
      
      // Типизируем элемент, чтобы безопасно переопределить onClick
      const element = child as React.ReactElement<{ 
        showDivider?: boolean; 
        onClick?: () => void 
      }>;

      return cloneElement(element, {
        showDivider: !isLast,
        // Оборачиваем оригинальный onClick: выполняем действие пункта + закрываем меню
        onClick: () => {
          if (element.props.onClick) {
            element.props.onClick();
          }
          closeMenu();
        }
      });
    }
    return child;
  });

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Закрываем другие меню перед открытием нового
    document.dispatchEvent(new CustomEvent("closeAllContextMenus"));
    
    setPosition({ top: e.clientY, left: e.clientX });
    setVisible(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      if (visible && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    
    document.addEventListener("closeAllContextMenus", closeMenu);
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("contextmenu", handleOutsideClick);
    
    return () => {
      document.removeEventListener("closeAllContextMenus", closeMenu);
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("contextmenu", handleOutsideClick);
    };
  }, [visible, closeMenu]);

  return (
    <>
      {/* display: contents позволяет обертке не влиять на Flex/Grid макеты */}
      <div onContextMenu={handleContextMenu} style={{ display: 'contents' }}>
        {children}
      </div>

      {visible && (
        <div
          ref={menuRef}
          className="fixed z-[9999] bg-white shadow-xl rounded-lg border-gray-light min-w-[265px] py-1"
          style={{ top: position.top, left: position.left }}
          // Останавливаем всплытие клика, чтобы он не дошел до document и не закрыл меню раньше времени
          onClick={(e) => e.stopPropagation()}
        >
          {/* Рендерим пункты, которые уже содержат логику закрытия в своих onClick */}
          {itemsWithDividers}
        </div>
      )}
    </>
  );
};