import { cn } from "@/app/lib/utils";

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={cn(
        `
            w-full p-3 bg-gray-50 text-accent-blue-dark placeholder:text-content-placeholder rounded-xl 
            border hover:border-border-secondary hover:text-content-body border-border-tertiary
            `,
        props.className
      )}
    />
  );
}
