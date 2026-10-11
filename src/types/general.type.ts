import type {
  ReactNode,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

export type ModalPropsType = {
  title: string;
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
  wrapperWidth?: string;
  isLoading?: boolean;
  footer?: React.ReactNode;
};

export type InputFieldProps = {
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  name?: string;
  id?: string;
  showError?: boolean;
  htmlFor?: string;
  error?: string | ReactNode;
  Icon?: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  wrapperClassName?: string;
  className?: string;
  register?:
    | ((name: string) => Record<string, unknown>)
    | Record<string, unknown>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">;

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "asLink"
  | "outline-danger"
  | "fill-danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: any;
  children?: ReactNode;
  isLoading?: boolean;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  iconColor?: string;
}

export const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1 text-sm h-[40px] rounded-[8px]",
  md: "px-4 md:px-5 py-2.5 h-[44px] text-sm  md:text-base min-w-[132px] rounded-[10px]",
  lg: "px-6 py-3 text-lg",
};

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#309fd9] text-white hover:bg-[#309fd9]/80 disabled:cursor-not-allowed disabled:bg-[#309fd9]/60 disabled:text-white/80 shadow-[0_12px_24px_#309fd966]",
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
