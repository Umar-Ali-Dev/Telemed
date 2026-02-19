import {
  Controller,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";

export interface TextAreaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  height?: string;
  required?: boolean;
}

function TextAreaField<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  height = "h-24",
  required = false,
}: TextAreaFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[14px] font-medium text-[#000000]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <textarea
              {...field}
              placeholder={placeholder}
              className={`
                w-full rounded-lg px-4 py-3 text-[14px] outline-none border transition-all
                ${height} border-[#D4CFCC] bg-white text-[#271100] resize-none
                placeholder:text-[#999999]/60
                ${error ? "border-red-500" : "focus:border-[#705295]"}
              `}
              value={field.value ?? ""}
            />
            {error && (
              <p className="text-red-500 text-[12px] mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default TextAreaField;
