import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pak focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const v = variant === "primary" ? "bg-pak text-white hover:bg-pak-dark" : variant === "outline" ? "border border-slate-300 bg-white text-ink hover:bg-sand" : "text-pak hover:bg-pak-light";
  const s = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";
  return <button className={`${base} ${v} ${s} ${className}`} {...props} />;
}
