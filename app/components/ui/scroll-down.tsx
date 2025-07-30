"use client";

import { smoothScrollTo } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type ScrollDownProps = {
  targetId: string;
  heroId: string;
  label?: string;
};

export default function ScrollDown({
  targetId,
  heroId,
  label = "Ver mais",
}: ScrollDownProps) {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando a PRÓXIMA seção estiver visível, esconde o botão
        setShowButton(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // detecta bem no início da seção
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [targetId]);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      smoothScrollTo(target)
    }
  };

  if (!showButton) return null;

  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-gray-600 text-xl hidden md:inline">{label}</span>
      <ChevronDown className="animate-bounce w-8 h-7 text-gray-700" />
    </div>
  );
}
