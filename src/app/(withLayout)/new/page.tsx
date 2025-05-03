"use client";

import EditableRecipe from "~/app/_components/recipes/editMode/EditableRecipe";
import { motion } from "framer-motion";

export default function NewRecipe() {
  return (
    <motion.div layoutId="new card" className="bg-base w-full shadow-lg">
      <EditableRecipe />
    </motion.div>
  );
}
