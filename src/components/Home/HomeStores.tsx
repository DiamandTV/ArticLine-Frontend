import { useDispatch } from "react-redux";
import { useHomeService } from "../../services/homeService";
import { LoaderQuery } from "../loader/LoaderWithQueryAndChildren";
import { setHomeStores } from "../../store/homeSlice";

export function HomeStores({children}:{children:React.ReactNode}){
    const dispatch = useDispatch()
    return(
        <LoaderQuery
            queryKey={['get-home-stores']}
            queryFn={useHomeService.getHomeStores} 
            onSuccess={(data)=>{
                if(data && data.data){
                    dispatch(setHomeStores(data.data))
                }            
            }}
            onError={(error)=>{

                console.log(error)
            }}
        >
            {children}
        </LoaderQuery>
    )
}