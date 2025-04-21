import { LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "~/server/auth";
import { signOut } from "next-auth/react";

export default async function Topbar() {
  const session = await auth();

  return (
    <div className="bg-base text-base-content sticky top-0 z-50 flex h-10 w-full flex-row items-center px-8 shadow-md">
      {session?.user ? (
        <div className="ml-auto flex flex-row items-center gap-4 font-serif italic">
          Olá Sunny!
          <button className="cursor-pointer" /* onClick={() => signOut()} */>
            <LogOut />
          </button>
        </div>
      ) : (
        <Link
          href={"api/auth/signin"}
          className="ml-auto font-serif italic underline"
        >
          És a Sunny?
        </Link>
      )}
    </div>
  );
}
