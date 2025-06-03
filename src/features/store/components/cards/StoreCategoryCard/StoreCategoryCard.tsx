import { StoreCategory } from "../../../compositions/StoreCategory"



type StoreCategoryCardProps = React.HTMLAttributes<HTMLElement>
export function StoreCategoryCard(attr:StoreCategoryCardProps){
  return(
    <StoreCategory.Card {...attr}>
      <StoreCategory.Image/>
      <StoreCategory.Settings/>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <StoreCategory.Title />
      </div>
    </StoreCategory.Card>
  )
}


