import type { ReactNode, InputHTMLAttributes } from "react";

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
  iconLeft?: boolean;
  wrapperClassName?: string;
  className?: string;
  register?:
    | ((name: string) => Record<string, unknown>)
    | Record<string, unknown>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">;
