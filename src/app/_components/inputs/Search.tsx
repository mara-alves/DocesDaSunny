import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="bg-base border-base-content outline-base-content flex flex-row items-center gap-1.5 border-2 px-2 py-1 outline-offset-1 has-focus-visible:outline-1">
      <input
        onChange={(e) => onSearch(e.target.value)}
        className="placeholder:text-base-content/70 w-full outline-none placeholder:font-serif placeholder:italic"
        placeholder="Escreve para pesquisar..."
      />
      <SearchIcon />
    </div>
  );
}
