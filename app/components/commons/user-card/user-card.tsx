import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import { ProfileData } from "@/app/server/get-profile-data";
import AddCustomLink from "./add-custom-link";
import { formatUrl } from "@/app/lib/utils";
import EditUserCard from "./edit-user-card";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";

export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner: boolean;
}) {
  const links = {
    link1: {
      title: profileData?.link1?.title as string,
      url: profileData?.link1?.url as string,
    },
    link2: {
      title: profileData?.link2?.title as string,
      url: profileData?.link2?.url as string,
    },
    link3: {
      title: profileData?.link3?.title as string,
      url: profileData?.link3?.url as string,
    },
  };

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white/10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src={
            (await getDownloadUrlFromPath(profileData?.imagePath)) ||
            "/user.png"
          }
          alt="User Picture"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            {profileData?.name || "Usuário sem nome"}
          </h3>
          {isOwner && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">
          {profileData?.description || "Usuário sem descrição"}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link
              href={profileData?.socialMedias?.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData?.socialMedias?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData?.socialMedias?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Twitter />
            </Link>
          )}
          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full min-h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.link1 && profileData?.link1.title != "" && (
            <Link
              href={formatUrl(profileData?.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && profileData?.link2.title != "" && (
            <Link
              href={formatUrl(profileData?.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && profileData?.link3.title != "" && (
            <Link
              href={formatUrl(profileData?.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData?.link3.title}</Button>
            </Link>
          )}
          {isOwner && <AddCustomLink links={links} />}
        </div>
      </div>
    </div>
  );
}
