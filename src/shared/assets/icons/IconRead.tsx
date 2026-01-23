interface IconReadProps {
  width?: number;
  height?: number;
  className?: string;
}

export const IconRead = ({ width = 14, height = 14, className }: IconReadProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.4796 3.91124L9.65708 3.08875L5.95875 6.78708L6.78125 7.60958L10.4796 3.91124ZM12.9529 3.08875L6.78125 9.26041L4.34292 6.82791L3.52042 7.65041L6.78125 10.9112L13.7812 3.91124L12.9529 3.08875ZM0.21875 7.65041L3.47958 10.9112L4.30208 10.0887L1.04708 6.82791L0.21875 7.65041Z"
        fill="currentColor"
      />
    </svg>
  );
};