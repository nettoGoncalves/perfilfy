import ProjectCard from "@/app/components/commons/project-card";
import { TotalVisits } from "@/app/components/commons/total-visits";
import UserSection from "@/app/components/commons/user/user-section";
import { auth } from "@/app/lib/auth";
import {
  getProfileData,
  getProfileProjects,
  ProjectData,
} from "@/app/server/get-profile-data";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import NewProject from "./new-project";
import {
  getDownloadUrlFromPath,
  getDownloadUrlsFromPaths,
} from "@/app/lib/firebase";
import { increaseProfileVisits } from "@/app/actions/increase-profile-visits";
import ProjectsSection from "@/app/components/commons/projects-section";
import ScrollDown from "@/app/components/ui/scroll-down";

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

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  return (
    <main className="relative h-screen">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <UserSection isOwner={isOwner} profileData={profileData} />
      <ProjectsSection
        isOwner={isOwner}
        profileId={profileId}
        projects={projects}
        img={await getDownloadUrlsFromPaths({ projects })}
      />
      {/* <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadUrlFromPath(project.imagePath)) || ""}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div> */}
      {/* {isOwner && (
        <div className="fixed bottom-4 right-0 left-0 w-min mx-auto">
          <TotalVisits totalVisits={profileData.totalVisits} showBar />
        </div>
      )} */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
        <ScrollDown heroId="hero" targetId="projects" />
      </div>
    </main>
  );
}
