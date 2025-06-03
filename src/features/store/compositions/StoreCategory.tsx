import { useContext } from "react"
import { FaPlus } from "react-icons/fa"
import { StoreCategoryForm } from "../components/forms/StoreCategory/StoreCategoryForm";
import { PaddingView } from "@views/PaddingView";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import {  FiSettings } from "react-icons/fi";
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont";
import { EditLabelButton } from "@components/buttons/EditButton/EditButton";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { ActionMenu } from "@components/ActionMenu/ActionMenu";

import { ModalProvider } from "@context/Modal/ModalProvider";
import { useStoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryProvider";
import { Can, CaslSubject } from "src/config/permissions/can";
import { useParams } from "react-router";
import { BottomSheetModalSetter } from "@context/BottomSheetModal/BottomSheetModalSetter";

interface StoreCategoryProps extends React.HTMLAttributes<HTMLElement>{
  children:React.ReactNode
}


export const StoreCategory = ()=>null

StoreCategory.Card = function Card({children,...attr}:StoreCategoryProps) {
  return (
    <div {...attr}  className="relative w-full overflow-hidden transition-all duration-300 bg-white rounded-lg shadow shadow-xl cursor-pointer hover:shadow-md">
      {children}
    </div>
  )
}

StoreCategory.Image = function Image(){
  const {storeCategory} = useStoreCategoryContext()
  const {image} = storeCategory
  return(
    <div
      className="w-full bg-center bg-cover h-28"
      style={{ backgroundImage: `url(${image})` }}
    />
  )
}

StoreCategory.Title = function Title(){
  const {storeCategory} = useStoreCategoryContext()
  const {name} = storeCategory
  return(
    <h3 className="text-base font-light text-gray-800 truncate">{name}</h3>
  )
}

StoreCategory.OnSettings = function OnSettings() {
  const { isOpen, setOpen } = useContext(BottomSheetModalContext);

  return (
      <ActionMenu
        isOpen={isOpen}
        setClose={() => setOpen(false)}
        items={[
          {
            action: <EditLabelButton text="EDIT" className="w-full md:w-[400px]" />,
            render: (onClose) => {
              return( 
                <BottomSheetModalSetter isOpen setOpen={onClose}>
                  <SimpleBottomSheetModal detent="content-height">
                    <PaddingView className="w-full md:w-[400px] ">
                      <StoreCategoryForm.Update />
                    </PaddingView>
                  </SimpleBottomSheetModal>
                </BottomSheetModalSetter>
            )  
          },
          },
          {
            action: <DeleteLabelButton text="DELETE" />,
            render: (onClose) => (
              <ModalProvider isOpen={true} setOpen={()=>onClose()}>
                <StoreCategoryForm.Delete/>
              </ModalProvider>
            ),
          },
        ]}
      />
 
  );
};


StoreCategory.Settings = function Settings({ onClick }: { onClick?: () => void }) {
  const {storeCategory} = useStoreCategoryContext()
  return (
    <Can I={"settings"} this={CaslSubject(storeCategory,'Store Category')}>
      <BottomSheetModalProviderFn>
          {
            ({setOpen})=>{
              return(
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick?.();
                      setOpen(true)
                    }}
                    className="absolute top-0 left-0 p-1 m-1 transition rounded-full bg-black/50 hover:bg-black/70"
                  >
                    <FiSettings className="text-white" size={22} />
                  </button>
                  <StoreCategory.OnSettings/>                
                </>
              )
            }
          }
      </BottomSheetModalProviderFn>
    </Can>
    
  );
};

StoreCategory.AddButton = function AddButton({...attr}:React.HTMLAttributes<HTMLElement>){
  const {setOpen} = useContext(BottomSheetModalContext)
  const companyId = Number(useParams()['company-id']) 
  const className = tailwindMerge("rounded-lg w-full h-full flex flex-col justify-center items-center text-surface-tonal-a10 text-4xl bg-primary-a50 hover:bg-primary-a40 ",attr.className)
  // !!! ONLY THE COMPANY CAN CREATE STORE CATEGORY ON HIS OWN STORE
  return(
    <Can I="create" this={CaslSubject({store:{company_profile:companyId}},'Store Category Create')}>
      <div 
        onClick={()=>{setOpen(true)}}
        className={className}>    
          <FaPlus />
      </div>
      <SimpleBottomSheetModal detent="content-height">
        <PaddingView className="md:w-[500px]">
          <StoreCategoryForm.Create/>
        </PaddingView>
      </SimpleBottomSheetModal>
    </Can>
  )
}