import type { ButtonHTMLAttributes, ReactNode } from "react";
import { BeatLoader } from "react-spinners";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "asLink"
  | "outline-danger"
  | "fill-danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: any;
  children?: ReactNode;
  isLoading?: boolean;
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm h-[40px] rounded-[8px]",
  md: "px-4 py-2.5 h-[44px] text-base md:min-w-[132px] rounded-[10px]",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#309fd9] text-white hover:bg-[#309fd9]/80 disabled:cursor-not-allowed disabled:bg-[#309fd9]/60 disabled:text-white/80 ",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline:
    "border border-[#309fd9] text-[#309fd9] hover:bg-[#309fd9] hover:text-white",
  "outline-danger":
    "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
  "fill-danger": "text-white bg-red-600 hover:bg-red-400",
  ghost: "text-gray-700",
  asLink:
    "text-white !px-0 !py-0 !h-auto !rounded-none border-b border-b-white hover:text-[#309fd9] hover:border-b-[#309fd9]",
};

export function Button({
  size = "md",
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  isLoading,
  iconPosition,
  iconClassName,
  ...props
}: ButtonProps) {
  const onlyIcon = Icon && !children;

  return (
    <button
      className={`flex cursor-pointer items-center justify-center gap-0.5 font-medium
                  duration-300
                  ${sizeClasses[size]} 
                  ${variantClasses[variant]} 
                  ${onlyIcon ? "p-2" : ""}
                  ${className}`}
      // disabled={!isLoading}
      {...props}
    >
      {isLoading ? (
        <BeatLoader color="#309fd9" size={10} />
      ) : (
        <>
          {Icon && iconPosition === "right" && (
            <Icon className={iconClassName} />
          )}
          {children && children}
          {Icon && iconPosition === "left" && (
            <Icon className={iconClassName} />
          )}
        </>
      )}
    </button>
  );
}
