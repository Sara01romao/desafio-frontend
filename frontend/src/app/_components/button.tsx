type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({ children, type, onClick, className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}