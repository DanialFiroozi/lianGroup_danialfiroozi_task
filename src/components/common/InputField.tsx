import { forwardRef, useId } from "react";
import type { InputFieldProps } from "../../types/general.type";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      labelClassName,
      label,
      name,
      id,
      htmlFor,
      error,
      Icon,
      iconLeft = false,
      wrapperClassName = "",
      className = "",
      register,
      placeholder,
      disabled,
      required,
      inputClassName,
      showError = false,
      ...rest
    },
    ref,
  ) {
    const reactId = useId();
    const inputId = id || name || `input-${reactId}`;
    const labelFor = htmlFor || inputId;
    const errorId = `${inputId}-error`;

    const registerProps =
      typeof register === "function"
        ? name
          ? register(name)
          : {}
        : register || {};

    return (
      <div className={`form-group w-full ${wrapperClassName}`}>
        {label && (
          <label
            className={`mb-2 mr-3 [&.text-center]:mr-0 block text-[14px] text-black ${labelClassName}`}
            htmlFor={labelFor}
          >
            {label}
            {required && <span className="text-[#dc3545] mr-1">*</span>}
          </label>
        )}

        <div className="relative">
          {!!Icon && (
            <Icon
              aria-hidden
              className={`absolute top-0 ${
                iconLeft ? "left-3" : "right-3"
              } bottom-0 my-auto size-5 text-gray-500`}
            />
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            placeholder={placeholder}
            aria-invalid={!!error || undefined}
            required={required}
            disabled={disabled}
            className={[
              `disabled:bg-gray-200 text-[15px] font-medium focus:border-[#309fd9] h-11 w-full bg-white disabled:bg-surface-100/30 rounded-lg text-black focus:bg-surface-400 px-4 outline-none border border-gray-200 placeholder:text-sm placeholder:font-light duration-300 ${inputClassName}`,
              Icon ? (iconLeft ? "pl-10" : "pr-10") : "",
              error ? "border-[#dc3545]" : "",
              className,
            ].join(" ")}
            {...registerProps}
            {...rest}
          />
        </div>

        {/* Error */}
        {showError && (
          <small
            id={errorId}
            className={`block font-light mr-3 h-5 text-xs text-[#dc3545] transition-opacity duration-150 mt-0.5 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error || ""}
          </small>
        )}
      </div>
    );
  },
);

export default InputField;
