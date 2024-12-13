import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { CardImage } from "../../cards/CardImage"

export function StoreImages(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        <CardImage image={store?.images[0]?.image} className="col-span-2 h-72 rounded-xl" />
    )
}