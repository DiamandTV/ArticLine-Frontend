// todo: to manage large number of stores, prefer to use pagination on the backend for the company stores
import { useSelector } from "react-redux"
import { RootState} from "../../store/store"
import { PaginationButtons } from "../../components/Store/ProductPage/PaginationButtons"
import { useState } from "react"
import { GridView } from "../../views/GridView"
import { StoreCard } from "../../components/Cards/StoreCard"
import { MAX_CARD_IN_PAGE } from "../../constraints"
import { StoresQueryCompany } from "../../components/Store/StoresQueryCompany"

export function StoresCompany(){
    const [page,setPage] = useState(1)
    
    const stores = useSelector((state:RootState)=>state.profileReduce.stores)
    const count = Math.floor(stores.length/MAX_CARD_IN_PAGE) + 1
    return ( 
        <StoresQueryCompany>
            <div className="flex flex-col gap-y-4"> 
                <PaginationButtons
                    count={count}
                    // todo : check the value of the varible because it can be null
                    page={page}
                    onChange={(page)=>setPage(page)}
                    />
                <GridView>
                    {stores.slice((page-1)*count,((page-1)*count)+count).map((store)=>{
                        return (
                            <StoreCard store={store}/>
                        )
                    })}
                </GridView>
            </div>
        </StoresQueryCompany>
    )
}