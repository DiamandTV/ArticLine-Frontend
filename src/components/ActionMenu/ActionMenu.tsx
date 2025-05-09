import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { useState } from "react";

type ActionItem = {
  action: React.ReactNode;
  render: (onClose: () => void) => React.ReactNode; // funzione per iniettare il contenuto
};

type ActionMenuProps = {
  isOpen: boolean;
  setClose: () => void;
  items: ActionItem[];
};

export function ActionMenu({ isOpen, setClose, items }: ActionMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleActionClick = (index: number) => {
    setClose(); // chiude il menu principale
    setTimeout(() => setActiveIndex(index), 300); // apre il componente associato
  };

  return (
    <>
      {/* Menu principale */}
      <SimpleBottomSheetModal isOpen={isOpen} setClose={setClose} detent="content-height">
        <div className="flex flex-col gap-2 w-full px-4 py-3">
          {items.map((item, index) => (
            <div key={index} onClick={(e) => {
                e.stopPropagation()
                handleActionClick(index)
                }}>
              {item.action}
            </div>
          ))}
        </div>
      </SimpleBottomSheetModal>

      {/* Componente dinamico */}
      {activeIndex !== null &&
        items[activeIndex].render(() => setActiveIndex(null))
      }
    </>
  );
}
