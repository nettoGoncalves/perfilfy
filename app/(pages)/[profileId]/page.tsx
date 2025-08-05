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
import LinksFooter from "@/app/components/commons/links-footer";
import { Metadata, ResolvingMetadata } from "next";
import { getSEOTags } from "@/app/lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "Perfilfy - Página Personalizada",
  appDescription: "Perfilfy - Página Personalizada",
  keywords: [
    "página profissional",
    "presença digital",
    "página digital personalizado",
  ],
  appDomain: "https://perfilfy.com/",
});

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
      {session?.user.isTrial && !session?.user.isSubscribed && (
        <div className="fixed bottom-0 left-0 w-full flex flex-col md:flex-row justify-center items-center gap-1 py-2 bg-white shadow-2xl z-50">
          <span className="text-accent-blue-dark">
            Você está usando a versão trial.
          </span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="text-accent-blue font-bold">
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
      {isOwner && (
        <div className="fixed top-4 right-0 left-0 md:w-[40%] mx-auto z-50">
          <TotalVisits totalVisits={profileData.totalVisits} showBar />
        </div>
      )}
      {/* <LinksFooter profileData={profileData} isOwner={isOwner} /> */}
      <div className="fixed bottom-8 -right-2 md:left-1/2 -translate-x-1/2">
        <ScrollDown heroId="hero" targetId="projects" />
      </div>
    </main>
  );
}
