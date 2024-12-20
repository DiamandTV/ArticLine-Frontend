import { useSelector } from "react-redux";
import { StoreCard } from "../Cards/StoreCard";
import { CardList } from "../List/CardList";
import { RootState } from "../../store/store";

export function HomeList(){
    const stores = useSelector((state:RootState)=>state.homeReducer.stores)
    return(
        stores ?
        <CardList
            itemCount={stores.length}
            
            itemSize={320}
            className="py-4"
        >
            {({index,style})=><StoreCard  store={stores[index]} style={style} className="px-1 first:pr-1 first:pl-0 last:pr-0 last:pl-1"/>}
        </CardList> : null
    )
}