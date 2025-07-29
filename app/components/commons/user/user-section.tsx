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
          <h1 className="text-[62px] leading-[52px] font-bold text-accent-blue-dark mb-3.5 text-center md:text-start">
            {profileData?.name || "Usuário sem nome"}
          </h1>
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
    </section>
  );
}
