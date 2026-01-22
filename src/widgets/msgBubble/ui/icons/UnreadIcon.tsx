interface UnreadIconProps {
  isOverlay?: boolean;
}

export const UnreadIcon = ({ isOverlay }: UnreadIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-0.5"
    >
      <path
        d="M14.5298 3.97119L6.59484 11.9062L3.45984 8.77869L2.40234 9.83619L6.59484 14.0287L15.5948 5.02869L14.5298 3.97119Z"
        fill={isOverlay ? "#fff" : "#747474"}
      />
    </svg>
  );
};
