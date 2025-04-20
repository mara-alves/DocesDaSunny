import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Fragment, type ReactNode } from "react";

export default function StyledDisclosure({
  icon,
  title,
  content,
}: {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}) {
  return (
    <Disclosure
      as={motion.div}
      layout
      className={"bg-primary border-base-content border-2"}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full flex-row items-center gap-4 px-4 py-2 font-semibold">
            {icon}
            {title}
            <ChevronDown
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
