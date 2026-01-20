import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  active?: boolean;
};

export default function Button({
  disabled = false,
  variant = "primary",
  active = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center cursor-pointer justify-center px-[10px] py-[5px]  rounded-md border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";



  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  const activeClasses =
    "bg-blue-600 text-white border-blue-600";

  const disabledClasses =
    "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      disabled={disabled}
      className={`
        ${baseClasses}

        ${active ? activeClasses : variantClasses[variant]}
        ${disabled ? disabledClasses : ""}
        ${className}
      `}
      {...props}   
    >
      {children}
    </button>
  );
}
