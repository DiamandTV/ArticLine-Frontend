import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { useCartService } from "../../services/cartService"
import { setCarts } from "../../store/cartsSlice"
import { BlurCard } from "../Cards/BlurCard"
import { LoaderResponse } from "../Loader/LoaderResponse"
import { useNavigate } from "react-router-dom"
import { CartModel } from "../../models/cart"

export function CartsQuery({children,load=true}:{children:React.ReactNode,load?:boolean}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isSuccess,isError,isLoading} = useQuery({
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryKey:['profile-get-carts'],
        queryFn:async()=>{
            return useCartService.getCartsList()
        },
        onSuccess:(data)=>{
            if(data && data.data ){
                const carts:Array<CartModel> = data.data
                dispatch(setCarts(data.data))
                // if(carts){
                //     navigate(`/carts/checkout/payment/${carts[0].id}`)
                // }
            }
        },
    })
    return(
         isSuccess ? children : load ?
            <div className="w-full h-screen min-h-5 flex justify-center items-center">
                <BlurCard className="h-full flex justify-center items-center">
                    <LoaderResponse
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        redirect={false}
                        messages={{
                            error:"SOMETHING WENT WRONG",
                            warning:"MAYBE SOMETHING WENT WRONG",
                            success:""
                        }}
                    />
                </BlurCard>
            </div> : null
        
        )
    
}