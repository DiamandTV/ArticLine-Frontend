import { ProductModel } from "../../models/Product";
import { BlurCard } from "./BlurCard";
import { CardImage } from "./CardImage";

export function OpenProductCard({product}:{product:ProductModel}){
    return(
        <BlurCard className="p-0 w-96" style={{padding:"0px"}}>
            <div className="w-[500px] flex flex-col gap-4">
                <CardImage image={product.image}/>
                <div className="w-full flex flex-col gap-y-2 text-white px-4">
                    <h1 className="w-full text-3xl font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                </div>
            </div>
        </BlurCard>    
    )
}