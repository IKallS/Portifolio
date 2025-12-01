interface ButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  icon,
  label,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      {label}
    </button>
  );
}
