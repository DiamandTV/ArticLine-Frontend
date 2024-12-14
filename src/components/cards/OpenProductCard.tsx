import { ProductModel } from "../../models/Product";
import { TextButton } from "../buttons/TextButtons";
import { Counter } from "../inputs/Counter/Counter";
import { BlurCard } from "./BlurCard";
import { CardImage } from "./CardImage";
import { Can } from "../../config/permissions/can";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DeleteButton } from "../buttons/DeleteButton";

export function OpenProductCard({product}:{product:ProductModel}){
    console.log(product)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        <BlurCard className="p-0 w-96" style={{padding:"0px"}}>
            <div className="w-[500px] flex flex-col gap-4">
                <CardImage image={product.image}/>
                <div className="w-full flex flex-col gap-y-2 text-white px-4">
                    <h1 className="w-full text-3xl font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                </div>
                <Counter/>
                <div className="w-full h-24 max-h-96 px-4 py-4 flex flex-row justify-center gap-x-2">
                    <TextButton
                        className="w-full max-w-[100%] py-4  text-xl font-bold"
                        text="AGGIUNGI"
                        onClick={()=>{
                        
                    }}
                />
                <Can I="delete" a="PRODUCT" this={store!}>
                    <DeleteButton onClick={()=>{

                    }}/>
                </Can>
                </div>
            </div>
        </BlurCard>    
    )
}