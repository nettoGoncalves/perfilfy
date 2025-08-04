"use client";

import { useState } from "react";
import Button from "../ui/button";
import TextInput from "../ui/text-input";
import { signIn } from "next-auth/react";

export default function CreateNow() {
  const [link, setlink] = useState("");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full mt-[5vh] lg:justify-start justify-center">
      <div className="flex items-center gap-2">
        <span className="text-accent-blue-dark text-xl">perfilfy.com/</span>
        <TextInput
          placeholder="Seu Link"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
      </div>
      <Button
        className="w-full max-w-[362px] sm:w-fit bg-[linear-gradient(90deg,#1e3a8a_0%,#38bdf8_100%)]"
        onClick={() => {
          signIn("google", {
            redirectTo: `/criar?link=${link}`,
          });
        }}
      >
        Criar meu Perfilfy
      </Button>
    </div>
  );
}
