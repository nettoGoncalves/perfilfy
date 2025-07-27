"use client"

import { ChevronDown } from "lucide-react";

type ScrollDownProps = {
  targetId: string;
  label?: string;
};

export default function ScrollDown({ targetId, label = "Ver mais" }: ScrollDownProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={handleClick}>
      <span className="text-gray-600 text-xl">{label}</span>
      <ChevronDown className="animate-bounce w-8 h-7 text-gray-700" />
    </div>
  );
}