import { BeatLoader } from "react-spinners";
import {
  type ButtonProps,
  sizeClasses,
  variantClasses,
} from "../../types/general.type";

export function Button({
  size = "md",
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  isLoading,
  iconPosition,
  iconClassName,
  iconColor = "#309fd9",
  ...props
}: ButtonProps) {
  const onlyIcon = Icon && !children;

  return (
    <button
      className={`flex items-center justify-center gap-0.5 font-medium
                  duration-300
                  ${sizeClasses[size]} 
                  ${variantClasses[variant]} 
                  ${onlyIcon ? "p-2" : ""}
                  ${className}
                  ${isLoading ? "pointer-events-none" : "cursor-pointer"}
                  `}
      disabled={isLoading && !isLoading}
      {...props}
    >
      {isLoading ? (
        <BeatLoader color={iconColor} size={10} />
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
