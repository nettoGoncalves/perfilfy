"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "../commons/project-card";
import { TotalVisits } from "../commons/total-visits";
import CreateNow from "../ui/create-now";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = (clientX - left - width / 2) / 50;
      const y = (clientY - top - height / 2) / 50;

      const elements =
        container.querySelectorAll<HTMLElement>("[data-parallax]");
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-parallax") || "1");
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row h-screen mb-[850px]  sm:mb-[650px] lg:mb-[150px]">
      <div className="w-full flex flex-col gap-2 lg:mt-[35vh] mt-[25vh] max-w-2xl mx-auto mb-12 lg:max-w-full lg:mx-0 lg:mb-0">
        <h1 className="sm:text-[52px] text-[42px] mb-4 font-bold text-accent-blue leading-[54px] text-center lg:text-start">
          Sua Identidade Profissional, Online e Pronta para Impressionar
        </h1>
        <h2 className="text-xl text-accent-blue-dark leading-6 text-center lg:text-start">
          Tenha um link personalizado para sua página profissional que reúne
          seus dados, laudos e documentos,
          <br />
          com monitoramento simples de cliques para você acompanhar o interesse
          no seu trabalho
        </h2>
        <CreateNow />
      </div>
      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#60a5fa,transparent_55%)]">
        <div className="relative w-full h-[550px]">
          <div data-parallax="1" className="absolute top-[50%] sm:left-[25%] left-0 z-10">
            <ProjectCard
              name="Modelo de Petição de Honorários"
              description="Documento base para solicitar honorários de forma profissional e fundamentada."
              img="projeto1.jpg"
              isOwner
            />
          </div>
          <div data-parallax="2" className="absolute top-0 lg:right-3.5 sm:right-[15%] right-0 z-10">
            <ProjectCard
              name="Artigo sobre Responsabilidade Técnica"
              description="Reflexões práticas sobre o papel e os limites da atuação técnica em processos judiciais."
              img="projeto2.jpg"
              isOwner
            />
          </div>
          <div data-parallax="3" className="absolute top-16 lg:left-3.5 left-[15%] -z-10 hidden sm:block">
            <ProjectCard
              name="Checklist para Nomeações"
              description="Uma lista prática do que revisar antes de aceitar um novo caso."
              img="projeto3.jpg"
              isOwner
            />
          </div>
        </div>
      </div>
    </section>
  );
}
