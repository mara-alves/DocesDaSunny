import { SearchIcon } from "lucide-react";

export default function Search({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="bg-base border-base-content outline-base-content flex flex-row items-center gap-1.5 border-2 px-2 py-1 outline-offset-1 has-focus-visible:outline-1">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="placeholder:text-base-content/70 w-full outline-none placeholder:font-serif placeholder:italic"
        placeholder="Escreve para pesquisar..."
      />
      <SearchIcon />
    </div>
  );
}
