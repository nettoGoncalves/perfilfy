"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectData } from "@/app/server/get-profile-data";
import ProjectCard from "./project-card";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";
import NewProject from "@/app/(pages)/[profileId]/new-project";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProjectsSection({
  projects,
  isOwner,
  profileId,
  img,
}: {
  projects?: ProjectData[];
  isOwner?: boolean;
  profileId?: string;
  img: string[];
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="projects"
      className="max-w-5xl flex flex-col items-center m-auto pb-20"
    >
      {projects && projects.length > 3 ? (
        <Swiper
          className="max-w-[90%]"
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            567: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {projects?.map((project, index) => (
            <SwiperSlide>
              <ProjectCard
                className="max-w-full"
                key={project.id}
                project={project}
                isOwner={isOwner}
                img={img[index]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-[90%]">
          {projects?.map((project, index) => (
            <div key={project.id} className="w-full sm:w-[45%] md:w-[30%]">
              <ProjectCard
                project={project}
                isOwner={isOwner}
                img={img[index]}
              />
            </div>
          ))}
        </div>
      )}
      <div
        className={`${projects && projects.length <= 3 ? "justify-center!" : ""} flex flex-col md:flex-row md:justify-between items-center w-full max-w-[90%] mt-6`}
      >
        {isOwner && <NewProject profileId={profileId || ""} />}
        {projects && projects.length > 3 && (
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="group hover:border-accent-blue-dark size-14 rounded-full border border-accent-blue-dark/60 flex justify-center items-center transition"
            >
              <ChevronLeft className="group-hover:text-accent-blue-dark text-accent-blue-dark/60 size-7 transition" />
            </button>
            <button
              ref={nextRef}
              className="group hover:border-accent-blue-dark size-14 rounded-full border border-accent-blue-dark/60 flex justify-center items-center transition"
            >
              <ChevronRight className="text-accent-blue-dark/60 group-hover:text-accent-blue-dark size-7 transition" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
