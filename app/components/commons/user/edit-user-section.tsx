"use client";

import { ArrowUpFromLine, UserPen } from "lucide-react";
import { startTransition, useState } from "react";
import Modal from "../../ui/modal";
import TextInput from "../../ui/text-input";
import TextArea from "../../ui/text-area";
import Button from "../../ui/button";
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from "@/app/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { saveProfile } from "@/app/actions/save-profile";
import { ProfileData } from "@/app/server/get-profile-data";

export default function EditUserSection({
  profileData,
}: {
  profileData?: ProfileData;
}) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name || "");
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || ""
  );

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    const imagesInput = document.getElementById(
      "profile-pic-input"
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    if (!profileId) return;

    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("profilePic", compressedFile[0]);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);

    await saveProfile(formData);

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingProfile(false);
      router.refresh();
    });
  }
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-white p-8 rounded-[20px] flex flex-col justify-between gap-10 md:w-[620px] w-[300px]">
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="md:max-w-[300px] md:w-full md:h-[300px] w-[200px] h-[200px] rounded-full bg-white overflow-hidden border">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Picture"
                  className="object-cover object-center size-full"
                />
              ) : (
                <button
                  onClick={() => triggerImageInput("profile-pic-input")}
                  className="w-full h-full"
                >
                  400x400
                </button>
              )}
            </div>
            <button
              onClick={() => triggerImageInput("profile-pic-input")}
              className="text-white flex items-center gap-2"
            >
              <ArrowUpFromLine color="black" className="size-4" />
              <span className="text-accent-blue-dark">Coloque sua melhor foto</span>
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="profile-pic-input"
              onChange={(e) => setProfilePic(handleImageInput(e))}
            />
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="your-name" className="text-accent-blue-dark">
                Seu nome
              </label>
              <TextInput
                id="your-name"
                placeholder="Digite seu nome"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="your-description" className="text-accent-blue-dark">Descrição</label>
              <TextArea
                id="your-description"
                placeholder="Fale um pouco sobre você"
                className="h-36"
                value={yourDescription}
                onChange={(e) => setYourDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
