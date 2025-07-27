"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectData } from "@/app/server/get-profile-data";
import ProjectCard from "./project-card";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";
import NewProject from "@/app/(pages)/[profileId]/new-project";

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
    <section className="max-w-4xl m-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
      >
        {projects?.map((project, index) => (
          <SwiperSlide>
            <ProjectCard
              key={project.id}
              project={project}
              isOwner={isOwner}
              img={img[index]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isOwner && <NewProject profileId={profileId || ""} />}
    </section>
  );
}
