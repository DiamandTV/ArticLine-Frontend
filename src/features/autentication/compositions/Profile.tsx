import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { RootState } from "@store/store"
import { useSelector } from "react-redux"
import { useGetEntityAddressSavedListQuery } from "../hooks/useGetEntityAddressSavedListQuery/useGetEntityAddressSavedListQuery"
import { EntityAddressProvider } from "../context/EntityAddressContext/EntityAddressProvider"
import { EntityAddressDetailedCard } from "../components/cards/EntityAddressCard/EntityAddressCard"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { PaddingView } from "@views/PaddingView"
import { EntityAddressForm } from "../components/forms/EntityAddressForm/EntityAddressForm"
import { Button, Container } from "react-bootstrap"
import { IoAdd } from "react-icons/io5"
import { PasswordActualForm } from "../components/forms/PasswordChangeForm/PasswordActualForm"

export const Profile = ()=>null

Profile.Image = function Image(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    const className = tailwindMerge("h-40 w-full bg-cover bg-center transition-transform duration-300 hover:scale-105",attr.className)
    return(
        <div
            className={className}
            style={{ backgroundImage: `url(${profile.image})` }}
        />
    )
}

Profile.EntityAddressAddButton = function AddButton(attr:React.HTMLAttributes<HTMLElement>){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                                {...attr} 
                                className={tailwindMerge("self-end p-1 w-max text-3xl",attr.className)}
                                onClick={(e)=>{
                                    setOpen(true)
                                    attr.onClick?.(e)
                                }}
                                >
                                <IoAdd />
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView className="md:w-[400px]">
                                    <EntityAddressForm.Create/>
                                </PaddingView>
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}


Profile.EntityAddressList = function List(attr:React.HTMLAttributes<HTMLElement>){
    const {data,isSuccess,isLoading,ref} = useGetEntityAddressSavedListQuery()
    if(isLoading || !isSuccess) return
    return(
        <div {...attr} className={tailwindMerge("w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,400px)]",attr.className)}>
            {
                data.map((entityAddress)=>{
                    return(
                        <EntityAddressProvider entityAddress={entityAddress}>
                            <EntityAddressDetailedCard imageClassName="md:h-[200px]"/>
                        </EntityAddressProvider>
                    )
                })
            }
            <div className="py-0.5" ref={ref}/>
        </div>
    )
}

Profile.AuthPasswordChange = function AuthPasswordChange(){
    return(
        <Container className="rounded-lg bg-surface-a0 p-mb-df">
            <PasswordActualForm/>
        </Container>
    )
}