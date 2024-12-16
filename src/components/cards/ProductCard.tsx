import { FaPlus } from "react-icons/fa6"
import { ProductModel } from "../../models/Product"
import { CardImage } from "./CardImage"
import { useContext, useRef } from "react"
import { DialogContext } from "../Dialog/DialogContext"
import { DeleteProduct } from "../Buttons/DeleteProduct"
//import { IconTextButton } from "../buttons/IconTextButton"
//import { IoSettings } from "react-icons/io5"
import { TextButton } from "../Buttons/TextButtons"
import { DrawerProvider } from "../Drawer/DrawerProvider"
import { DrawerContext } from "../Drawer/DrawerContext"
import { ProductEdit } from "../Forms/ProductEdit"
import { DrawerApp } from "../Drawer/Drawer"
import { BlurCard } from "./BlurCard"
import { Can } from "../../config/permissions/can"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface ProductCardProps{
    product:ProductModel
}
export function ProductCard({product}:ProductCardProps){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {setOpen} = useContext(DialogContext)
    const divRef = useRef<HTMLDivElement | null>(null)
    return (
        <div 
            ref={divRef}
            onClick={(e:React.MouseEvent<HTMLDivElement>)=>{
                    console.log("CLICKED")
                    setOpen(true)
                
            }}
            className="hover:cursor-pointer w-full h-full max-h-72 grid grid-cols-2 justify-between items-star bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl px-6 py-4 box-border gap-y-4">
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
            <Can I="update" a="PRODUCT" this={store}>
                <div className="w-full h-14 flex flex-row col-span-2 gap-x-2">
                    <DrawerProvider>
                        <DrawerContext.Consumer>
                            {({setOpen})=>
                                <TextButton 
                                    text="EDIT"
                                    className="max-w-[1000px] w-full"
                                    onClick={(e)=>{
                                        e.stopPropagation()
                                        //e.nativeEvent.stopImmediatePropagation()
                                        if(setOpen){
                                            setOpen(true)
                                        } 
                                    }}
                                />
                            }
                            
                        </DrawerContext.Consumer>
                        <DrawerApp>
                            <BlurCard className="max-w-lg h-full max-h-screen text-white">
                                <ProductEdit product={product}/>
                            </BlurCard>
                        </DrawerApp>
                    </DrawerProvider>
                    <DeleteProduct
                            product={product}
                        />
                </div>
            </Can>
        </div>
    )
}