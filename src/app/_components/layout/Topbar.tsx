"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { data: session } = useSession();
  const [circleCount, setCircleCount] = useState(0);

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      setCircleCount(Math.ceil(innerWidth / 36));
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-base text-base-content sticky top-0 z-50 flex h-8 w-full shrink-0 flex-row items-center px-6 md:px-8">
      {session?.user ? (
        <div className="mt-1.5 ml-auto flex flex-row items-center gap-4 font-serif italic">
          Olá Sunny!
          <Link href={"/manager"}>
            <Settings className="icon-btn" />
          </Link>
          <LogOut className="icon-btn" onClick={() => signOut()} />
        </div>
      ) : (
        <Link
          href={"api/auth/signin"}
          className="mt-1.5 ml-auto font-serif italic underline"
        >
          És a Sunny?
        </Link>
      )}
      <div className="absolute top-8 left-0 flex w-full flex-row">
        {new Array(circleCount).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="bg-base h-4 w-full rounded-br-full rounded-bl-full shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
