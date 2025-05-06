import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext"
import { useContext, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { StoreCategoryForm } from "../../forms/StoreCategory/StoreCategoryForm";
import { PaddingView } from "@views/PaddingView";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FiEdit2, FiSettings, FiTrash2 } from "react-icons/fi";
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider";
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont";
import { EditLabelButton } from "@components/buttons/EditButton/EditButton";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";

interface StoreCategoryProps extends React.HTMLAttributes<HTMLElement>{
  children:React.ReactNode
}
export function StoreCategory({children,...attr}:StoreCategoryProps) {
  return (
    <div {...attr}  className="w-full relative shadow-xl sm:w-64 rounded-lg shadow hover:shadow-md transition-all duration-300 bg-white overflow-hidden cursor-pointer">
      {children}
    </div>
  )
}

StoreCategory.Image = function Image(){
  const {storeCategory} = useContext(StoreCategoryContext)
  if(!storeCategory) return
  const {image} = storeCategory
  return(
    <div
      className="h-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />
  )
}

StoreCategory.Title = function Title(){
  const {storeCategory} = useContext(StoreCategoryContext)
  if(!storeCategory) return
  const {name} = storeCategory
  return(
    <h3 className="font-light text-base text-gray-800 truncate">{name}</h3>
  )
}

StoreCategory.OnEdit = function OnEdit(){
  const {setOpen:setMenuOpen} = useContext(BottomSheetModalContext)
  return(
    <BottomSheetModalProviderFn>
                {
                  ({setOpen})=>{
                    return(
                        <>
                          <EditLabelButton
                            text="EDIT"
                            onClick={()=>{
                              setOpen(true)
                              setTimeout(()=>{
                                setMenuOpen(false)
                              },300)
                            }}
                          />
                          <SimpleBottomSheetModal detent="content-height">
                            <PaddingView>
                              <StoreCategoryForm.Update/>
                            </PaddingView>
                          </SimpleBottomSheetModal>
                        </>
                    )
                  }
                }
              </BottomSheetModalProviderFn>
  )
}

StoreCategory.OnSettings = function OnSettings(){
  
  return(
    <SimpleBottomSheetModal detent="content-height">
      <PaddingView>
        <div className="w-full flex gap-2">
            <StoreCategory.OnEdit/>
            <DeleteLabelButton
              text="DELETE"
            />
        </div>
      </PaddingView>
    </SimpleBottomSheetModal>
  )
}

StoreCategory.Settings = function Settings({ onClick }: { onClick?: () => void }) {
  return (
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
                  className="absolute top-0 left-0 p-1 m-1 rounded-full bg-black/50 hover:bg-black/70 transition"
                >
                  <FiSettings className="text-white" size={22} />
                </button>
                <StoreCategory.OnSettings/>                
              </>
            )
          }
        }
    </BottomSheetModalProviderFn>
    
  );
};


type StoreCategoryCardProps = React.HTMLAttributes<HTMLElement>
export function StoreCategoryCard(attr:StoreCategoryCardProps){
  return(
    <StoreCategory {...attr}>
      <StoreCategory.Image/>
      <StoreCategory.Settings/>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <StoreCategory.Title/>
      </div>
    </StoreCategory>
  )
}


export function StoreCategoryAdd({...attr}:React.HTMLAttributes<HTMLElement>){
  const {setOpen} = useContext(BottomSheetModalContext)
  const className = tailwindMerge("rounded-lg w-full h-full flex flex-col justify-center items-center text-surface-tonal-a10 text-4xl bg-primary-a50 hover:bg-primary-a40 ",attr.className)
  return(
    <>
      <div 
        onClick={()=>{setOpen(true)}}
        className={className}>    
          <FaPlus />
      </div>
      <SimpleBottomSheetModal detent="content-height">
        <PaddingView>
          <StoreCategoryForm.Create/>
        </PaddingView>
      </SimpleBottomSheetModal>
    </>
  )
}