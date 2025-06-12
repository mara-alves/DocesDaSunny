import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import CustomChevron from "~/app/_images/CustomChevron.svg";
import { type ReactNode } from "react";

export default function StyledDisclosure({
  open,
  setOpen,
  icon,
  title,
  content,
}: {
  open: boolean;
  setOpen: () => void;
  icon: ReactNode;
  title: string;
  content: ReactNode;
}) {
  return (
    <Disclosure
      as={motion.div}
      layout
      transition={{ duration: 0.2 }}
      className={"bg-primary border-base-content border-2"}
      defaultOpen={open}
      onClick={setOpen}
    >
      {() => (
        <>
          <DisclosureButton className="flex w-full flex-row items-center gap-4 px-4 py-2 font-semibold">
            {icon}
            {title}
            <CustomChevron
              className={"ml-auto transition " + (open ? "rotate-180" : "")}
            />
          </DisclosureButton>
          <AnimatePresence>
            {open && (
              <DisclosurePanel static>
                <motion.div
                  layout
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {content}
                </motion.div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
