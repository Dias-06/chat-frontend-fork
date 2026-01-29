interface ArrowIconProps {
  isOpen: boolean;
}

export const ArrowIcon = ({ isOpen }: ArrowIconProps) => {
  return (
    <svg
      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z"
        fill="#747474"
      />
    </svg>
  );
};
