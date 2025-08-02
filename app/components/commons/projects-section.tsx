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
  return (
    <section
      id="projects"
      className="max-w-5xl flex flex-col items-center m-auto pt-32 pb-40"
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
          navigation={{ prevEl: ".nav-btn-back", nextEl: ".nav-btn-next" }}
        >
          {projects?.map((project, index) => (
            <SwiperSlide key={project.id}>
              <ProjectCard
                className="max-w-full"
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
              className="nav-btn-back group hover:border-accent-blue-dark size-14 rounded-full border border-accent-blue-dark/60 flex justify-center items-center transition"
            >
              <ChevronLeft className="group-hover:text-accent-blue-dark text-accent-blue-dark/60 size-7 transition" />
            </button>
            <button
              className="nav-btn-next group hover:border-accent-blue-dark size-14 rounded-full border border-accent-blue-dark/60 flex justify-center items-center transition"
            >
              <ChevronRight className="text-accent-blue-dark/60 group-hover:text-accent-blue-dark size-7 transition" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
