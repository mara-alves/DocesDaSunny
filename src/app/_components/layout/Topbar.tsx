import Link from "next/link";
import { auth } from "~/server/auth";

export default async function Topbar() {
  const session = await auth();

  return (
    <div className="bg-base text-base-content sticky top-0 flex h-10 w-full flex-row items-center px-8 shadow-md">
      <Link
        href={"api/auth/signin"}
        className="ml-auto font-serif italic underline"
      >
        {session?.user ? "Sou a Sunny!" : "És a Sunny?"}
      </Link>
    </div>
  );
}
