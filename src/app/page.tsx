import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Sidebar from "./_components/layout/Sidebar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      Doces da Sunny
    </div>
  );
}
