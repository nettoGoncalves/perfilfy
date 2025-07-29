"use server";

import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function deleteProject(profileId: string, projectId: string) {
  const session = await auth();
  if (!session) return false;

  try {
    // Referência ao documento do projeto
    const projectRef = db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(projectId);

    // Busca o documento para pegar o caminho da imagem
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      console.error("Projeto não encontrado.");
      return false;
    }

    const projectData = projectDoc.data();
    const imagePath = projectData?.imagePath;

    // Deleta o documento do Firestore
    await projectRef.delete();

    // Deleta a imagem do Storage, se existir
    if (imagePath) {
      const fileRef = storage.file(imagePath);
      await fileRef.delete().catch((err) => {
        console.warn("Erro ao deletar imagem do Storage:", err.message);
      });
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return false;
  }
}