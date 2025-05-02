import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext"
import { useContext, useState } from "react"
import { Sheet } from 'react-modal-sheet';
import { FaPlus } from "react-icons/fa"

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

export function StoreCategoryCard(){
  return(
    <StoreCategory>
      <StoreCategory.Image/>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <StoreCategory.Title/>
      </div>
    </StoreCategory>
  )
}

export function StoreCategoryAdd(){
  const [isOpen,setOpen] = useState(false)
  return(
    <>
      <StoreCategory>
        <div 
          onClick={()=>{setOpen(true)}}
        className="w-full h-full flex flex-col justify-center items-center text-surface-tonal-a10 text-4xl bg-primary-a50 hover:bg-primary-a40" >
          <FaPlus />
        </div>
      </StoreCategory>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{/* Your sheet content goes here */}HELO</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

    </>
  )
}