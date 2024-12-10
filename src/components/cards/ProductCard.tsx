import { FaPlus } from "react-icons/fa6"
import { ProductModel } from "../../models/Product"
import { CardImage } from "./CardImage"

interface ProductCardProps{
    product:ProductModel
}
export function ProductCard({product}:ProductCardProps){
    console.log(product)
    return (
        <div className="w-full h-full max-h-60 grid grid-cols-2 justify-between items-star bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl px-6 py-4 box-border">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl text-ellipsis overflow-hidden font-normal">{product.name}</h1>
                <p className="w-full h-full max-h-20 lipsis overflow-hidden text-el">
                    {product.description}
                </p>
                <span className="text-xl mt-auto font-medium">{product.price} $</span>
            </div>
            <div className="rounded-xl h-full flex flex-row justify-center items-stretch gap-x-2 ">
                <CardImage image={product.image!} settings={false} className="rounded-xl max-h-40"/>
                <div className="max-w-max  p-2 hover:cursor-pointer border-2 border-slate-300 rounded-xl flex flex-col justify-center items-center "> 
                    <FaPlus size={30}/>
                </div>
            </div>
        </div>
    )
}