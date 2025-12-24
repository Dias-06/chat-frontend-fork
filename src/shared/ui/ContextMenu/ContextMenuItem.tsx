// src/shared/ui/ContextMenu/ContextMenuItem.tsx
import React from "react";

// 1. Определение иконок (Icons должен быть внутри файла или импортирован)
const Icons = {
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="gray" viewBox="0 0 24 24">
      <path d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.9 17 8C17 9.1 16.1 10 15 10C13.9 10 13 9.1 13 8C13 6.9 13.9 6 15 6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM9 18C9.22 17.28 12.31 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 15V12H9V10H6V7H4V10H1V12H4V15H6Z" />
    </svg>
  ),
  BellOff: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="gray" viewBox="0 0 24 24">
     <path d="M4.33969 2.935L2.92969 4.345L7.28969 8.705L6.99969 9.005H2.99969V15.005H6.99969L11.9997 20.005V13.415L16.1797 17.595C15.5297 18.085 14.7997 18.475 13.9997 18.705V20.765C15.3397 20.465 16.5697 19.845 17.6097 19.015L19.6597 21.065L21.0697 19.655L4.33969 2.935ZM9.99969 15.175L7.82969 13.005H4.99969V11.005H7.82969L8.70969 10.125L9.99969 11.415V15.175ZM18.9997 12.005C18.9997 12.825 18.8497 13.615 18.5897 14.345L20.1197 15.875C20.6797 14.705 20.9997 13.395 20.9997 12.005C20.9997 7.725 18.0097 4.145 13.9997 3.235V5.295C16.8897 6.155 18.9997 8.835 18.9997 12.005ZM11.9997 4.005L10.1197 5.885L11.9997 7.765V4.005ZM16.4997 12.005C16.4997 10.235 15.4797 8.715 13.9997 7.975V9.765L16.4797 12.245C16.4897 12.165 16.4997 12.085 16.4997 12.005Z" />
    </svg>
  ),
  BellOn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="gray" viewBox="0 0 24 24">
    <path d="M10.4796 3.91124L9.65708 3.08875L5.95875 6.78708L6.78125 7.60958L10.4796 3.91124ZM12.9529 3.08875L6.78125 9.26041L4.34292 6.82791L3.52042 7.65041L6.78125 10.9112L13.7812 3.91124L12.9529 3.08875ZM0.21875 7.65041L3.47958 10.9112L4.30208 10.0887L1.04708 6.82791L0.21875 7.65041Z" fill="#7769E1"/><path d="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM10 8.82998V15.17L7.83 13H5V11H7.83L10 8.82998ZM16.5 12C16.5 10.23 15.48 8.70998 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998Z" fill="gray"/>
    </svg>
  ),
  PinOff: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="grey" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5637 12.0059C7.51058 11.9559 8.31761 10.4694 8.47777 9.73242L2.93175 4.17268L4.33882 2.76137L21.0676 19.498L19.6575 20.9121L13.5285 14.7871V21.002L12.5285 22.002L11.5325 21.002V14.002H5.5637V12.0059ZM10.0224 11.2811C9.95868 11.3969 9.89123 11.5121 9.82049 11.6246C9.73915 11.754 9.65174 11.8826 9.55873 12.0064H10.7475L10.0224 11.2811ZM6.80518 2.34702C6.99316 2.11572 7.27572 2.01603 7.5598 1.99805H17.5598C18.4817 2.08008 18.5625 2.87305 18.5625 3.0124C18.5246 3.68555 18.0051 4.00575 17.5598 4.00575H16.5592V9.01405C16.6199 11.17 18.4043 12.0096 19.5599 12.0096V14.0057H18.4004C18.4004 14.0057 14.7796 10.3467 14.7393 10.3306C14.6964 10.3134 14.5361 9.39697 14.5573 9.01405V4.00575H10.5535V6.14697L6.80518 2.34702Z" />
    </svg>
  ),
  CheckCircle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trash: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#FF0000"/>
    </svg>
  ),
  Reply: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a2 2 0 012 2v14l-4-4H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
    </svg>
  ),
  Forward: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Copy: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1 2 2-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1l2-2 2 2v10a2 2 0 01-2 2h-2m-1-4h-4" />
    </svg>
  ),
  MessageUnread: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M4 2.5H20C20.8239 2.5 21.5 3.17614 21.5 4V20.793L18.207 17.5H4C3.17614 17.5 2.5 16.8239 2.5 16V4C2.5 3.17614 3.17614 2.5 4 2.5ZM3.5 16.5H18.623L20.5 18.377V3.5H3.5V16.5Z" 
        fill="none" stroke="gray"/><circle cx="19" cy="5" r="5" fill="#7769E1"/>
    </svg>
  ),
  MessageRead: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2.5H20C20.8239 2.5 21.5 3.17614 21.5 4V20.793L18.207 17.5H4C3.17614 17.5 2.5 16.8239 2.5 16V4C2.5 3.17614 3.17614 2.5 4 2.5ZM3.5 16.5H18.623L20.5 18.377V3.5H3.5V16.5Z" fill="#747474" stroke="#747474"/>
      <path d="M8.44141 9.64989L11.0668 12.2731L17.168 6.17188" stroke="gray" strokeWidth="2"/>
    </svg>
  ),
};

// 2. Определение типов для пропсов (ContextMenuItemProps)
export type IconName = keyof typeof Icons;

export interface ContextMenuItemProps {
  children: React.ReactNode;
  iconName: IconName;
  onClick: () => void;
  showDivider?: boolean; // Проп будет автоматически передан из ContextMenu
}

// 3. Сам компонент
export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  children,
  iconName,
  onClick,
  showDivider = false,
}) => {
  const IconComponent = Icons[iconName];

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-between p-4 cursor-pointer"
    >
      <span className="font-medium  pr-4 whitespace-nowrap">
        {children}
      </span>
      
      <div className="flex items-center justify-center w-5 h-5 text-black flex-shrink-0">
        <IconComponent className="w-full h-full" />
      </div>

      {showDivider && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-light" />
      )}
    </div>
  );
};