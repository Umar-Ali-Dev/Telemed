import { useState } from "react";
import {
  Controller,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorsMessage from "./ErrorMessage";

export interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type: "text" | "password" | "email" | "number" | "tel" | "";
  placeholder?: string;
  required?: boolean;
  className?: string;
  height?: string;
  hideStar?: boolean;
  disabled?: boolean;
  rules?: Record<string, any>;
  onChange?: (value: any) => void;
}

function InputField<T extends FieldValues>({
  label,
  name,
  control,
  type,
  required = false,
  className,
  height,
  placeholder,
  hideStar = false,
  rules = {},
  onChange: customOnChange,
  disabled = false,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputHeight = height || "h-[45px]";
  const isPasswordType = type === "password";

  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""}`}>
      <label className="text-[14px] font-medium text-[#000000]">
        {label}{" "}
        {!hideStar && required && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => {
          // Internal handler to ensure both react-hook-form and custom logic trigger
          const handleInternalChange = (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const val = e.target.value;
            field.onChange(val); // This updates the react-hook-form state
            if (customOnChange) customOnChange(val); // This triggers your custom logic
          };

          return (
            <div className="relative w-full">
              <input
                {...field} // Spread field to include value, name, onBlur, and ref
                type={
                  isPasswordType ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                disabled={disabled}
                /* Force the value to use the field value from Controller. 
                   The nullish coalescing ensures it's never 'undefined' (which causes controlled vs uncontrolled errors)
                */
                value={field.value ?? ""}
                onChange={handleInternalChange}
                className={`
                  w-full rounded-lg px-4 text-[14px] outline-none transition-all
                  ${inputHeight}
                  border bg-white text-[#000000]
                  placeholder:text-[#999999]
                  ${error ? "border-red-500" : "border-[#D4CFCC] focus:border-[#705295]"}
                  ${disabled ? "bg-gray-100 cursor-not-allowed opacity-80" : "cursor-text"}
                `}
              />

              {isPasswordType && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999]"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              )}

              {error && (
                <div className="mt-1">
                  <ErrorsMessage title={error.message} className="text-left" />
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default InputField;
