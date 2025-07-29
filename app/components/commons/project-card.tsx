"use client";

import { increaseProjectVisits } from "@/app/actions/increase-project-visits";
import { formatUrl } from "@/app/lib/utils";
import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "../ui/button";
import { startTransition, useState } from "react";
import { deleteProject } from "@/app/actions/delete-project";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  project,
  isOwner,
  img,
  name,
  buttonText,
  description,
  className,
}: {
  project?: ProjectData;
  isOwner?: boolean;
  img: string;
  name?: string;
  buttonText?: string;
  description?: string;
  className?: string;
}) {
  const { profileId } = useParams();
  const formattedUrl = formatUrl(project?.projectUrl || "");

  const [isDeletingProject, setIsDeletingProject] = useState(false);

  const router = useRouter();

  async function handleClick() {
    if (!profileId || !project?.id || isOwner) return;
    await increaseProjectVisits(profileId as string, project.id);
  }

  async function handleDeleteProject() {
    setIsDeletingProject(true);

    await deleteProject(profileId as string, project?.id as string);

    startTransition(() => {
      setIsDeletingProject(false);
      router.refresh();
    });
  }

  return (
    <>
      <div
        className={`${className} min-h-[350px] flex flex-col gap-5 bg-white p-3 rounded-[20px] shadow-2xl`}
      >
        <div className="h-40 flex-shrink-0">
          <img
            src={img}
            alt="Projeto"
            className="w-full rounded-2xl h-full object-cover border-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-blue">
              {project?.totalVisits || 0} cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-black font-bold text-xl mb-3.5">
              {name || project?.projectName}
            </span>
            <span className="text-content-body text-sm">
              {description || project?.projectDescription}
            </span>
            <div className="flex flex-col gap-2">
              <Link
                href={formattedUrl}
                target="_blank"
                onClick={handleClick}
                className="self-center w-full mt-6"
              >
                <Button className="w-full">Acessar link</Button>
                {/* fazer texto do botão dinamico */}
              </Link>
              {isOwner && (
                <Button
                  onClick={handleDeleteProject}
                  className="bg-red-700"
                  disabled={isDeletingProject}
                >
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
