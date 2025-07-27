import { auth } from "@/app/lib/auth";
import Button from "../ui/button";
import { manageAuth } from "@/app/actions/manage-auth";
import { getProfileId } from "@/app/server/get-profile-data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

export default async function Header() {
  const session = await auth();

  const profileId = await getProfileId(session?.user?.id as string);

  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10 px-4 z-10">
      <Link href="/" className="flex cursor-pointer">
        <img src="/logo.png" className="w-[200px]" alt="Logo" />
      </Link>
      {session && (
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-3 rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 border-2">
              <MenuIcon color="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session &&  (
                <Link href={`/${profileId}`}>
                  <DropdownMenuItem>Minha Página</DropdownMenuItem>
                </Link>
              )}
              <form action={manageAuth}>
                <button type="submit">
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div
        className={
          session
            ? "sm:flex items-center gap-4 hidden"
            : "flex items-center gap-4"
        }
      >
        {session && (
          <Link href={`/${profileId}`}>
            <Button>Minha Página</Button>
          </Link>
        )}
        <form action={manageAuth}>
          <Button>{session ? "Sair" : `Login`}</Button>
        </form>
      </div>
    </div>
  );
}
