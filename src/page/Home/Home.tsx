import { CategoryCardList } from "../../components/List/CategoryList"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { HomeStores } from "../../components/Home/HomeStores"
import { HomeList } from "../../components/Home/HomeList"

export function  Home(){
    const categories = useSelector((state:RootState)=>state.categoryReducer.categories)

    // useEffect(()=>{
    //     toast.success("Success Notification !", {
    //         position: "top-right"
    //     });
    // },[])

    return (
        <>
        <CategoryCardList categories={categories!}/>
        <hr className="bg-gray-600 border-gray-500 " />
        <HomeStores>
            <HomeList/>
        </HomeStores>
        </>
    )
}