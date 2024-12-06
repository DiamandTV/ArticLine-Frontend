import { CategoryCard } from "../../components/cards/CategoryCard"
import { CartList } from "../../components/CardList/CardList"
import { StoreCard } from "../../components/cards/StoreCard"
import { CategoryModel } from "../../models/category"
import { StoreModel } from "../../models/store"
import { CategoryCardList } from "../../components/CardList/CategoryList"


const stores:Array<StoreModel> = [
    {
        title:"Pizzeria da Giuseppe",
        images:["https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg","https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0"],
        description:"",
        average_rating:4.3,
        ratings:500,
        views:250
    },
    {
        title:"Pizzeria da Giuseppe",
        images:["https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg","https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0"],
        description:"",
        average_rating:4.3,
        ratings:500,
        views:250
    },
    {
        title:"Pizzeria da Giuseppe",
        images:["https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg","https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0"],
        description:"",
        average_rating:4.3,
        ratings:500,
        views:250
    },
    {
        title:"Pizzeria da Giuseppe",
        images:["https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg","https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0"],
        description:"",
        average_rating:4.3,
        ratings:500,
        views:250
    },
    {
        title:"Pizzeria da Giuseppe",
        images:["https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg","https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0"],
        description:"",
        average_rating:4.3,
        ratings:500,
        views:250
    }
]
export function  Home(){
    return (
        <>
        <CategoryCardList/>
        <hr className="bg-gray-600 border-gray-500 " />
            <CartList
                itemCount={stores.length}
                
                itemSize={320}
                className="py-4"
            >
                {({index,style})=><StoreCard  store={stores[index]} style={style} className="px-1 first:pr-1 first:pl-0 last:pr-0 last:pl-1"/>}
            </CartList>
            <CartList
                itemCount={stores.length}
                
                itemSize={320}
                className="py-4"
            >
                {({index,style})=><StoreCard  store={stores[index]} style={style} className="px-1 first:pr-1 first:pl-0 last:pr-0 last:pl-1"/>}
            </CartList>
        </>
    )
}