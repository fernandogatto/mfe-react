import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-medium transition",
        variant === "default" && "bg-black text-white hover:opacity-90",
        variant === "outline" && "border border-gray-300",
        className,
      )}
      {...props}
    />
  );
}
