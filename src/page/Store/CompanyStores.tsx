// todo: to manage large number of stores, prefer to use pagination on the backend for the company stores
import { useSelector } from "react-redux"
import { RootState} from "../../store/store"
import { GridView } from "../../views/GridView"
import { StoreCard } from "../../components/Cards/StoreCard"
import { StoresQueryCompany } from "../../components/Store/StoresQueryCompany"
import { PaginationProvider } from "../../components/Pagination/PaginationProvider"
import { PaginationButtonWithContext } from "../../components/Pagination/PaginationRender"

export function StoresCompany(){    
    const stores = useSelector((state:RootState)=>state.profileReduce.stores)
    return ( 
        <PaginationProvider>
            <StoresQueryCompany>
                <div className="flex flex-col gap-y-4"> 
                    <PaginationButtonWithContext/>
                    <div className="w-full h-full @container">
                        <GridView className=" @2xl:grid-cols-4">
                            {stores.map((store)=>{
                                return (
                                    <StoreCard store={store}/>
                                )
                            })}
                        </GridView>
                    </div>
                </div>
            </StoresQueryCompany>
        </PaginationProvider>
    )
}