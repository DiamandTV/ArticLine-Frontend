import { CategoryCard } from "../../components/cards/CategoryCard"
import { CartList } from "../../components/CardList/CardList"
import { StoreCard } from "../../components/cards/StoreCard"
import { CategoryModel } from "../../models/category"
import { StoreModel } from "../../models/store"
const categories:Array<CategoryModel> = [
    {
        image:"https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
        name:'PIZZA'
    },
    {
        image:"https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0",
        name:'SPESA'
    },
    {
        image:"https://static.vecteezy.com/ti/foto-gratuito/p1/23809530-un-volante-hamburger-con-tutti-il-strati-ai-generativo-gratuito-foto.jpg",
        name:'BURGER'
    },
    {
        image:"https://www.galbani.it/sites/default/files/styles/width_1920/public/2023-01/dolci_SHub_1280x595_Visual.jpg?itok=SQA-bm74",
        name:'DOLCI E DESSERT'
    },
    {
        image:"https://sweetest.it/wp-content/uploads/2021/06/sushi-01.jpeg",
        name:'SUSHI'
    },
    {
        image:"https://www.saporie.com/assets/it/news/news/come%20fare%20la%20spesa%20settimanale.jpg?_u=e94b195fa261978d57d1dbe8ee51953dfb4762f0",
        name:'SPESA'
    },
    {
        image:"https://static.vecteezy.com/ti/foto-gratuito/p1/23809530-un-volante-hamburger-con-tutti-il-strati-ai-generativo-gratuito-foto.jpg",
        name:'BURGER'
    },
    {
        image:"https://www.galbani.it/sites/default/files/styles/width_1920/public/2023-01/dolci_SHub_1280x595_Visual.jpg?itok=SQA-bm74",
        name:'DOLCI E DESSERT'
    },
    {
        image:"https://sweetest.it/wp-content/uploads/2021/06/sushi-01.jpeg",
        name:'SUSHI'
    }
    
]

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
            <CartList
                itemCount={categories.length}
                
                itemSize={320}
                className=" pt-2 pb-4"
                >
                {({index,style})=><CategoryCard  category={categories[index]} style={style} className="px-1 first:pr-1 first:pl-0 last:pr-0 last:pl-1"/>}
            </CartList>
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