import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext"
import { useContext } from "react"
import { FaPlus } from "react-icons/fa"
import { StoreCategoryForm } from "../../forms/StoreCategory/StoreCategoryForm";
import { PaddingView } from "@views/PaddingView";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";

interface StoreCategoryProps extends React.HTMLAttributes<HTMLElement>{
  children:React.ReactNode
}
export function StoreCategory({children}:StoreCategoryProps) {
  return (
    <div className="w-full shadow-xl sm:w-64 rounded-lg shadow hover:shadow-md transition-all duration-300 bg-white overflow-hidden cursor-pointer">
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

type StoreCategoryCardProps = React.HTMLAttributes<HTMLElement>
export function StoreCategoryCard(attr:StoreCategoryCardProps){
  return(
    <StoreCategory {...attr}>
      <StoreCategory.Image/>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <StoreCategory.Title/>
      </div>
    </StoreCategory>
  )
}

export function StoreCategoryAdd(){
  const {setOpen} = useContext(BottomSheetModalContext)
  return(
    <>
      <StoreCategory>
        <div 
          onClick={()=>{setOpen(true)}}
        className="w-full h-full flex flex-col justify-center items-center text-surface-tonal-a10 text-4xl bg-primary-a50 hover:bg-primary-a40" >
          <FaPlus />
        </div>
      </StoreCategory>
      <SimpleBottomSheetModal detent="content-height">
        <PaddingView>
          <StoreCategoryForm.Create/>
        </PaddingView>
      </SimpleBottomSheetModal>
    </>
  )
}