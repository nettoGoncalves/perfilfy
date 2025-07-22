import ProjectCard from "@/app/components/commons/project-card";
import { TotalVisits } from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card/user-card";
import { auth } from "@/app/lib/auth";
import {
  getProfileData,
  getProfileProjects,
} from "@/app/server/get-profile-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewProject from "./new-project";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  // TODO: adicionar page view

  // TODO: Se o usuário não estiver mais no trial, não deixar ele ver o projeto e direcionar para o upgrade.

  return (
    <div className="relative h-screen flex gap-5 p-20">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w1/2 flex justify-center h-min">
        <UserCard isOwner={isOwner} profileData={profileData} />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadUrlFromPath(project.imagePath)) || ""}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className="fixed bottom-4 right-0 left-0 w-min mx-auto">
          <TotalVisits />
        </div>
      )}
    </div>
  );
}
