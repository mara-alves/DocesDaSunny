"use client";

import { Check, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import InputText from "~/app/_components/inputs/InputText";
import Search from "~/app/_components/inputs/Search";
import LoadingIndicator from "~/app/_components/layout/LoadingIndicator";
import TopPageNavigation from "~/app/_components/layout/TopPageNavigation";
import { api } from "~/trpc/react";

export default function Manager() {
  const [search, setSearch] = useState<string>("");
  const [toEdit, setToEdit] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  const ingredientsQuery = api.ingredient.list.useQuery(
    { search },
    {
      placeholderData: (previousData) => previousData,
    },
  );
  const deleteMutation = api.ingredient.delete.useMutation({
    onSuccess: () => ingredientsQuery.refetch(),
  });
  const editMutation = api.ingredient.edit.useMutation({
    onSuccess: async () => {
      await ingredientsQuery.refetch();
      setToEdit(null);
    },
  });

  return (
    <div className="bg-base flex w-full flex-col shadow-lg">
      <TopPageNavigation />
      <div className="flex flex-col gap-4 px-6 pb-6">
        <div className="heading mt-auto text-4xl">Gestor de Ingredientes</div>
        <div className="border-primary relative mt-6 border-2 p-2">
          <div className="heading bg-base absolute -top-6 -left-2 px-2 text-2xl">
            Atenção!
          </div>
          <div className="bg-primary/50 px-4 py-2">
            Apagar um ingrediente vai fazer com que ele desapareça de todas as
            receitas, pelo que{" "}
            <span className="font-semibold">
              se não tiveres cuidado certas receitas poderão ficar incompletas!
            </span>
            <br></br>Renomear um ingrediente atualiza-o em todas as receitas em
            que aparece.
          </div>
        </div>

        <Search value={search} setValue={setSearch} />
        <div className="flex flex-col">
          {!ingredientsQuery.data && <LoadingIndicator />}
          {ingredientsQuery.data?.map((ingredient) => (
            <div
              key={ingredient.id}
              className="border-primary flex flex-row items-center gap-2 border-b-2"
            >
              {toEdit === ingredient.id ? (
                <>
                  <InputText value={newName} setValue={setNewName} />
                  <X
                    className="icon-btn ml-auto"
                    onClick={() => setToEdit(null)}
                  />
                  <Check
                    className="icon-btn"
                    onClick={() =>
                      toast.promise(
                        editMutation.mutateAsync({
                          id: ingredient.id,
                          name: newName,
                        }),
                        {
                          loading: "A editar...",
                          success: "Ingrediente renomeado!",
                          error: "Ocorreu um erro :(",
                        },
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <div className="py-1.5">{ingredient.name}</div>
                  <Pencil
                    className="icon-btn ml-auto"
                    onClick={() => {
                      setNewName(ingredient.name);
                      setToEdit(ingredient.id);
                    }}
                  />
                  <Trash
                    className="icon-btn"
                    onClick={() =>
                      toast.promise(
                        deleteMutation.mutateAsync({ id: ingredient.id }),
                        {
                          loading: "A apagar...",
                          success: "Ingrediente apagado!",
                          error: "Ocorreu um erro :(",
                        },
                      )
                    }
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
