import React, { useState } from "react";
import DatePickerComponent from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, type Control } from "react-hook-form";
import { LuCalendarDays } from "react-icons/lu";
import ErrorsMessage from "./ErrorMessage";

interface DatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  className?: string;
  disabled?: boolean;
  dateFormat?: string;
  onChange?: (date: Date | null) => void;
  disablePastDates?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  control,
  label,
  rules = {},
  className,
  disabled,
  dateFormat = "MM/dd/yyyy",
  onChange: customOnChange,
  disablePastDates = false,
}) => {
  const isRequired = rules?.required;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full ${className || ""} text-left`}>
      {label && (
        <label className="text-[14px] font-medium text-[#000000]">
          {label} {isRequired && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <style>{`
        .react-datepicker-popper { z-index: 9999 !important; }
        .react-datepicker { 
          background-color: #FFFFFF !important; 
          border: 1px solid #D4CFCC !important; 
          border-radius: 12px !important; 
          font-family: inherit !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
        }
        .react-datepicker__header { background-color: #FFFFFF !important; border-bottom: 1px solid #F3F4F6 !important; }
        .react-datepicker__current-month { color: #271100 !important; font-weight: 700 !important; }
        .react-datepicker__day-name { color: #A3948C !important; }
        .react-datepicker__day { color: #271100 !important; border-radius: 8px !important; }
        .react-datepicker__day:hover { background-color: #F3F4F6 !important; }
        .react-datepicker__day--selected { 
          background-color: #705295 !important; 
          color: white !important; 
        }
        .react-datepicker__navigation-icon::before { border-color: #271100 !important; }
      `}</style>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="relative w-full">
            <DatePickerComponent
              id={name}
              selected={value}
              onChange={(date: Date | null) => {
                onChange(date);
                if (customOnChange) customOnChange(date);
              }}
              autoComplete="off"
              placeholderText="Select date"
              dateFormat={dateFormat}
              disabled={disabled}
              minDate={disablePastDates ? new Date() : undefined}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              showYearDropdown
              scrollableYearDropdown
              className={`
                w-full h-[48px] rounded-xl bg-white px-4 text-[14px] text-[#271100] outline-none transition-all
                border ${error ? "border-red-500" : isFocused ? "border-[#705295]" : "border-[#D4CFCC]"}
              `}
            />
            <LuCalendarDays className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999999] text-[20px] pointer-events-none" />
            {error && (
              <div className="mt-1">
                <ErrorsMessage title={error.message} />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default DatePicker;
