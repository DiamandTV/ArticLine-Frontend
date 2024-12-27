import { useForm } from "react-hook-form"
import { usePaginationInfiniteScroll } from "../../hooks/usePaginationInfiniteScroll"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AccountCard } from "./AccountCard"
import { PaginationModel } from "../../models/pagination"
import { CourierProfileModel } from "../../models/Courier"

interface SearchServerProps{
    queryKey:Array<string>,
    queryFn:unknown,
}

export function SearchServer({queryFn,queryKey}:SearchServerProps){
    const {register,watch,setValue} = useForm<{search_server:string}>({
        defaultValues:{search_server:""}
    })

    // todo: make the search render more smooth
    const {data,ref} = usePaginationInfiniteScroll({
        queryKey:[...queryKey,watch('search_server')],
        queryFn:({pageParam})=>queryFn({page:pageParam,search:watch('search_server')}),
    })
    return(
        <div className="w-full h-full">
            <form>
                <AnimationPlaceholderInput
                    labelName="SEARCH"
                    name="search_server"
                    type="text"
                    register={register('search_server')}
                />
                <div className="w-full h-full">
                    {data ? data!.pages.map((page)=>{
                        return (page.data as PaginationModel).results.map((profile:CourierProfileModel)=>{
                                    return (
                                        <AccountCard profile={profile} className="hover:cursor-pointer" 
                                            onClick={(event)=>{
                                                event.stopPropagation()
                                                const complete_name = profile.first_name + " " + profile.last_name
                                                setValue('search_server',complete_name)
    
                                                // set the order courier as selected courier
                                                //todo: set the order courier in the backend db
                                            }}
                                        />
                                    )
                                }) 
                    }) : null}
                </div>
            </form>
        </div>
    )
}