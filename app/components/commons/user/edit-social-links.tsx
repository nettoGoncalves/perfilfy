"use client";

import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Plus,
} from "lucide-react";
import { startTransition, useState } from "react";
import Modal from "../../ui/modal";
import { useParams } from "next/navigation";
import { createSocialLinks } from "@/app/actions/create-social-links";
import TextInput from "../../ui/text-input";
import Button from "../../ui/button";
import { useRouter } from "next/navigation";

export default function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
    mail: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  const [whatsapp, setWhatsapp] = useState(socialMedias?.whatsapp || "");
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "");
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "");
  const [mail, setMail] = useState(socialMedias?.mail || "");
  const { profileId } = useParams();

  const router = useRouter();

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);

    if (!profileId) return;

    await createSocialLinks({
      profileId: profileId as string,
      whatsapp,
      instagram,
      linkedin,
      mail,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl border hover:border-black/20"
      >
        <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-white p-8 rounded-[20px] flex flex-col justify-between gap-10 sm:w-[514px] w-full">
          <p className="text-accent-blue-dark font-bold text-xl text-center">
            Adicionar redes sociais
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Phone />
              <TextInput
                type="text"
                placeholder="Link para o Whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link para o Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link para o Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Mail />
              <TextInput
                type="text"
                placeholder="Link o seu e-mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-accent-blue"
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
