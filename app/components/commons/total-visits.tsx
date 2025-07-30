import { manageAuth } from "@/app/actions/manage-auth";
import { auth } from "@/app/lib/auth";
import { Eye, MenuIcon, TrendingUp } from "lucide-react";
import PortalButton from "./portalButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export async function TotalVisits({
  totalVisits = 0,
  showBar = false,
}: {
  totalVisits?: number;
  showBar?: boolean;
}) {
  const session = await auth();

  return (
    <header className="w-full whitespace-nowrap flex items-center justify-between gap-5 bg-white px-8 py-3 rounded-xl shadow-2xl z-50">
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 text-accent-blue">
          <Eye />
          <span className="text-3xl font-bold">{totalVisits}</span>
        </div>
      </div>
      <Link href="/" className="flex cursor-pointer">
        <img src="/logo.png" className="w-[200px]" alt="Logo" />
      </Link>
      {showBar && (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-3 rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 border">
            <MenuIcon color="black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {session?.user.isSubscribed && <PortalButton />}
            </DropdownMenuItem>
            <form action={manageAuth}>
              <button type="submit" className="w-full">
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
