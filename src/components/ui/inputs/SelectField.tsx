import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Select, {
  components,
  type MultiValue,
  type SingleValue,
  type StylesConfig,
} from "react-select";
import { FaChevronDown } from "react-icons/fa";
import ErrorsMessage from "./ErrorMessage";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
  menuPlacement?: "auto" | "top" | "bottom";
  height?: string;
  width?: string;
  addNew?: () => void;
  withCheckbox?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  bgColor?: string;
}

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <FaChevronDown
      style={{
        color: props.selectProps.isDisabled
          ? "#667085"
          : props.isFocused
            ? "#FFFFFF"
            : "#98A2B3",
      }}
      className="text-base"
    />
  </components.DropdownIndicator>
);

const OptionWithCheckbox = (props: any) => {
  const { isSelected, label, innerRef, innerProps, data, selectProps } = props;
  const value = selectProps.value;
  const options = selectProps.options as Option[];
  let isChecked = isSelected;
  if (data.value === "all") {
    const allOptionsExceptAll = options.filter((opt) => opt.value !== "all");
    isChecked =
      Array.isArray(value) && value.length === allOptionsExceptAll.length;
  }
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-white/5 cursor-pointer text-white border-b border-white/5 last:border-0"
    >
      <label className="text-sm cursor-pointer font-light">{label}</label>
      <div
        className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isChecked ? "bg-[#69C900] border-[#69C900]" : "bg-transparent border-gray-600"}`}
      >
        {isChecked && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props} className="no-scrollbar">
      {props.children}
    </components.MenuList>
  );
};

const customStyles = (
  height: string,
  hasError: boolean,
  isFocused: boolean,
  bgColor?: string,
  hideMultiValue?: boolean,
  readOnly?: boolean,
): StylesConfig<Option, boolean> => ({
  control: (base) => ({
    ...base,
    backgroundColor: readOnly ? "#121217" : bgColor || "#17171C",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: hasError
      ? "#EF4444"
      : isFocused
        ? "#FFFFFF"
        : "rgba(255, 255, 255, 0.1)",
    boxShadow: "none",
    borderRadius: "0.75rem",
    padding: "0 4px",
    cursor: readOnly ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    minHeight: height,
    height: height,
    opacity: readOnly ? 0.7 : 1,
    "&:hover": {
      borderBottomColor: readOnly
        ? "rgba(255, 255, 255, 0.1)"
        : hasError
          ? "#EF4444"
          : "#FFFFFF",
    },
  }),
  valueContainer: (base) => ({ ...base, paddingLeft: "1rem", height: height }),
  input: (base) => ({ ...base, color: "#FFFFFF !important", fontSize: "12px" }),
  multiValue: (base) => ({
    ...base,
    display: hideMultiValue ? "none" : "flex",
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#667085" : "#FFFFFF",
    fontSize: "12px",
  }),
  placeholder: () => ({ display: "none" }),
  indicatorsContainer: (base) => ({ ...base, height: height }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
    backgroundColor: "#000000",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 9999,
    marginTop: "8px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "transparent",
    color: "#FFFFFF",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    ":active": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  }),
});

function SelectField<T extends FieldValues>({
  label,
  name,
  control,
  options,
  isMulti = false,
  required = false,
  className = "",
  menuPlacement = "auto",
  height = "60px",
  width,
  addNew,
  withCheckbox = false,
  hideSelectedOptions = false,
  closeMenuOnSelect = true,
  disabled,
  readOnly = false,
  bgColor,
}: SelectFieldProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const componentWidth = width ? width : "w-full";

  return (
    <div className={`relative text-left ${componentWidth} ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field, fieldState: { error } }) => {
          const hasValue = isMulti
            ? Array.isArray(field.value) && field.value.length > 0
            : !!field.value;
          const shouldFloat = withCheckbox ? false : isFocused || hasValue;
          const hasError = !!error;

          return (
            <div className="relative w-full" style={{ height }}>
              <label
                className={`absolute left-4 z-10 origin-left transform text-sm duration-200 pointer-events-none ${shouldFloat ? "top-1/2 -translate-y-6 scale-[0.85]" : "top-1/2 -translate-y-1/2 scale-100"} ${readOnly ? "text-gray-500" : "text-white"}`}
              >
                {label}{" "}
                {required && <span className="ml-1 text-red-500">*</span>}
              </label>
              <Select
                {...field}
                id={String(name)}
                styles={customStyles(
                  height,
                  hasError,
                  isFocused,
                  bgColor,
                  withCheckbox && isMulti,
                  readOnly,
                )}
                options={options}
                isMulti={isMulti}
                isSearchable={!withCheckbox}
                menuPlacement={menuPlacement}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                hideSelectedOptions={hideSelectedOptions}
                closeMenuOnSelect={closeMenuOnSelect}
                isDisabled={disabled || readOnly}
                classNamePrefix="no-scrollbar"
                onFocus={() => !readOnly && setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(selectedOption, actionMeta) => {
                  if (readOnly) return;
                  if (isMulti) {
                    const selected =
                      (selectedOption as MultiValue<Option>) || [];
                    const selectedValues = selected.map(
                      (option) => option.value,
                    );
                    const allOptionValues = options
                      .filter((opt) => opt.value !== "all")
                      .map((option) => option.value);
                    if (actionMeta.option?.value === "all") {
                      const isAllCurrentlySelected =
                        Array.isArray(field.value) &&
                        allOptionValues.every((val) =>
                          field.value.includes(val),
                        );
                      field.onChange(
                        isAllCurrentlySelected ? [] : allOptionValues,
                      );
                    } else {
                      field.onChange(selectedValues.filter((v) => v !== "all"));
                    }
                  } else {
                    const singleValue = selectedOption as SingleValue<Option>;
                    if (singleValue?.value === "addNew") addNew?.();
                    else field.onChange(singleValue?.value || null);
                  }
                }}
                value={
                  isMulti
                    ? options.filter(
                        (option) =>
                          Array.isArray(field.value) &&
                          field.value.includes(option.value),
                      )
                    : options.find((option) => option.value === field.value) ||
                      null
                }
                components={{
                  DropdownIndicator,
                  ClearIndicator: () => null,
                  MenuList,
                  ...(withCheckbox ? { Option: OptionWithCheckbox } : {}),
                }}
              />
              {error && (
                <div className="absolute left-0 top-full w-full z-30">
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

export default SelectField;
