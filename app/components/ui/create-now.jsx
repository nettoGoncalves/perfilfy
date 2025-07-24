"use client";

import { useState } from "react";
import Button from "../ui/button";
import TextInput from "../ui/text-input";
import { signIn } from "next-auth/react";

export default function CreateNow() {
  const [link, setlink] = useState("");

  return (
    <div className="flex items-center gap-2 w-full mt-[10vh]">
      <span className="text-white text-xl">projectinbio.com</span>
      <TextInput
        placeholder="Seu Link"
        value={link}
        onChange={(e) => setlink(e.target.value)}
      />
      <Button
        onClick={() => {
          signIn("google", {
            redirectTo: `/criar?link=${link}`,
          });
        }}
      >
        Criar agora
      </Button>
    </div>
  );
}
