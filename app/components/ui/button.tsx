import { cn } from "@/app/lib/utils";

export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "p-3 px-6 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 cursor-pointer",
        variant === "primary" && "bg-accent-blue",
        variant === "secondary" && "bg-accent-blue-light",
        variant === "ghost" && "border-border-primary",
        props.className
      )}
    >
      {children}
    </button>
  );
}
