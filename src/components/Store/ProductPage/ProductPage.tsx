import { useDispatch, useSelector } from "react-redux";
import { PaginationButtons } from "./PaginationButtons";
import { RootState } from "../../../store/store";
import { GridView } from "../../../views/GridView";
//import { ProductCard } from "../../cards/ProductCard";
import { useParams } from "react-router-dom";
import { setPageForCategory } from "../../../store/storeSlice";
import {v4 as uuid} from "uuid"
import { DialogProductCard } from "../../Cards/DialogProductCard";
import { DialogProvider } from "../../Dialog/DialogProvider";
//import { Can } from "../../../config/permissions/can";

export function ProductPage(){
    const params = useParams()
    const pagination = useSelector((state:RootState)=>state.storeReducer.pagination)
    const products = useSelector((state:RootState)=>state.storeReducer.products)
    const pageForCategories = useSelector((state:RootState)=>state.storeReducer.pageCountCategories)
    const storeCategoryId =params['sub-category-id']
    //const store = useSelector((state:RootState)=>state.storeReducer.store)
    const dispatch = useDispatch()
    return(
        storeCategoryId ?
        <div className="@container flex flex-col gap-y-4"> 
            <PaginationButtons 
                count={pagination?.number_of_pages}
                // todo : check the value of the varible because it can be null
                page={pageForCategories![storeCategoryId]}
                onChange={(page)=>dispatch(setPageForCategory({storeCategoryId,page}))}
                />
            <GridView className="grid-cols-2 @md:grid-cols-2 @lg:grid-cols-3">
                {products?.map((product)=>{
                    return(
                        <DialogProvider  key={uuid()}>
                            <DialogProductCard 
                                product={product}/>
                        </DialogProvider>
                    )
                })}
            </GridView>
        </div> : null
    )
}