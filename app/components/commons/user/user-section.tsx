import { Instagram, Linkedin, Mail, Phone, Plus } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import { ProfileData } from "@/app/server/get-profile-data";
import AddCustomLink from "./add-custom-link";
import { formatUrl } from "@/app/lib/utils";
import EditUserSection from "./edit-user-section";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";
import ScrollDown from "../../ui/scroll-down";
import { useRef } from "react";

export default async function UserSection({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
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
    <section id="hero" className="w-full h-screen flex flex-col lg:flex-row lg:justify-center max-w-7xl m-auto gap-5 items-center p-5">
      <img
        src={
          (await getDownloadUrlFromPath(profileData?.imagePath || "")) ||
          "/user.png"
        }
        alt="User Picture"
        className="rounded-full object-cover shadow-2xl lg:max-w-[400px] w-full max-w-[300px] h-[300px] lg:h-[400px]"
      />
      <div className="flex flex-col gap-2 lg:w-1/2 sm:max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center lg:justify-start">
          <h3 className="text-[62px] leading-[52px] font-bold text-accent-blue-dark mb-3.5">
            {profileData?.name || "Usuário sem nome"}
          </h3>
          {isOwner && <EditUserSection profileData={profileData} />}
        </div>
        <p className="mb-3 text-center lg:text-start">
          {profileData?.description || "Usuário sem descrição"}
        </p>
        <div className="flex flex-col gap-2 w-full items-center lg:items-start">
          <div className="flex gap-3">
            {profileData?.socialMedias?.whatsapp && (
              <Link
                href={profileData?.socialMedias?.whatsapp}
                target="_blank"
                className="p-3 rounded-xl border hover:border-black/20"
              >
                <Phone />
              </Link>
            )}
            {profileData?.socialMedias?.instagram && (
              <Link
                href={profileData?.socialMedias?.instagram}
                target="_blank"
                className="p-3 rounded-xl border hover:border-black/20"
              >
                <Instagram />
              </Link>
            )}
            {profileData?.socialMedias?.linkedin && (
              <Link
                href={profileData?.socialMedias?.linkedin}
                target="_blank"
                className="p-3 rounded-xl border hover:border-black/20"
              >
                <Linkedin />
              </Link>
            )}
            {profileData?.socialMedias?.mail && (
              <Link
                href={profileData?.socialMedias?.mail}
                target="_blank"
                className="p-3 rounded-xl border hover:border-black/20"
              >
                <Mail />
              </Link>
            )}
            {isOwner && (
              <EditSocialLinks socialMedias={profileData?.socialMedias} />
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-3 w-full min-h-[172px]">
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
          {!profileData && (
            <button
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Plus />
            </button>
          )}
          {isOwner && <AddCustomLink links={links} />}
        </div>
      </div> */}
    </section>
  );
}
