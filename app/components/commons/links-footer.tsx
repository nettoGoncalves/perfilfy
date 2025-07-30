import { formatUrl } from "@/app/lib/utils";
import { ProfileData } from "@/app/server/get-profile-data";
import Link from "next/link";
import Button from "../ui/button";
import AddCustomLink from "./user/add-custom-link";
import { Plus } from "lucide-react";

export default function LinksFooter({
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
    <footer className="pb-22">
      <h2 className="text-center font-bold text-accent-blue-dark text-[42px] mb-6">
        Descubra mais
      </h2>
      <div className="max-w-7xl m-auto flex items-center justify-center gap-3">
        {profileData?.link1 && profileData?.link1.title != "" && (
          <Link
            href={formatUrl(profileData?.link1.url)}
            target="_blank"
            className="text-xl underline hover:text-accent-blue-dark"
          >
            {profileData?.link1.title}
          </Link>
        )}
        {profileData?.link2 && profileData?.link2.title != "" && (
          <Link
            href={formatUrl(profileData?.link2.url)}
            target="_blank"
            className="text-xl underline hover:text-accent-blue-dark"
          >
            {profileData?.link2.title}
          </Link>
        )}
        {profileData?.link3 && profileData?.link3.title != "" && (
          <Link
            href={formatUrl(profileData?.link3.url)}
            target="_blank"
            className="text-xl underline hover:text-accent-blue-dark"
          >
            {profileData?.link3.title}
          </Link>
        )}
        {!profileData && (
          <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
            <Plus />
          </button>
        )}
        {isOwner && <AddCustomLink links={links} />}
      </div>
    </footer>
  );
}
