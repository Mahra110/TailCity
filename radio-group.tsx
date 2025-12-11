"use client";

import * as React from "react";
import { cn } from "./utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

function RadioGroup({
  className,
  value,
  onValueChange,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        role="radiogroup"
        className={cn("grid gap-3", className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

function RadioGroupItem({
  className,
  value,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context.value === value;

  const handleChange = () => {
    if (context.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="radio"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div
        onClick={handleChange}
        className={cn(
          "aspect-square size-4 shrink-0 rounded-full border-2 shadow-sm transition-all cursor-pointer",
          isChecked
            ? "border-[#E1AD01] bg-[#E1AD01]"
            : "border-[#E1AD01]/30 bg-transparent hover:border-[#E1AD01]/50",
          props.disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {isChecked && (
          <div className="flex items-center justify-center h-full">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
        )}
      </div>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
