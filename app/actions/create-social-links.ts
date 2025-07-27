"use server"

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

export async function createSocialLinks({
  profileId,
  whatsapp,
  instagram,
  linkedin,
  mail,
}: {
  profileId: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  mail: string;
}) {
  const session = await auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        whatsapp,
        instagram,
        linkedin,
        mail,
      },
      updatedAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
