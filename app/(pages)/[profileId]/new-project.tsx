"use client";

import { createProject } from "@/app/actions/create-project";
import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/text-area";
import TextInput from "@/app/components/ui/text-input";
import { compressFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function newProject({ profileId }: { profileId: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [isCreatingProject, setIsCreatigProject] = useState(false);

  const handleOpenModal = () => {    
    setIsOpen(true);
  };

  async function handleCreateProject() {
    setIsCreatigProject(true);

    const imagesInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatigProject(false);
      setProjectName("");
      setProjectDescription("");
      setProjectUrl("");
      setProjectImage("");
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-4 rounded-[20px] flex items-center gap-2 justify-center border border-accent-blue-dark/60 hover:border-accent-blue-dark group"
      >
        <Plus className="text-accent-blue-dark/60 group-hover:text-accent-blue-dark" />
        <span className="text-accent-blue-dark/60 group-hover:text-accent-blue-dark">Novo Card</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-white p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-accent-blue-dark font-bold text-xl">Novo card</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-white overflow-hidden border">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project image"
                    className="object-cover object-center w-full h-full"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("imageInput")}
                    className="w-full h-full"
                  >
                    260x160
                  </button>
                )}
              </div>
              <button
                className="text-accent-blue-dark flex items-center gap-2"
                onClick={() => triggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e) ?? "")}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-accent-blue-dark font-bold">
                  Titulo do card
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o projeto"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-accent-blue-dark font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-accent-blue-dark font-bold">
                  URL
                </label>
                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
