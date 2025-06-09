import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { RootState } from "@store/store"
import { useDispatch, useSelector } from "react-redux"
import { useGetEntityAddressSavedListQuery } from "../hooks/useGetEntityAddressSavedListQuery/useGetEntityAddressSavedListQuery"
import { EntityAddressProvider } from "../context/EntityAddressContext/EntityAddressProvider"
import { EntityAddressDetailedCard } from "../components/cards/EntityAddressCard/EntityAddressCard"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { PaddingView } from "@views/PaddingView"
import { EntityAddressForm } from "../components/forms/EntityAddressForm/EntityAddressForm"
import { Button } from "react-bootstrap"
import { IoAdd } from "react-icons/io5"
import { AuthPasswordCard } from "../components/cards/AuthPasswordCard/AuthPasswordCard"
import { AuthEmailCard } from "../components/cards/AuthEmailCard/AuthEmailCard"
import { AuthPhoneNumberCard } from "../components/cards/AuthPhoneNumberCard/AuthPhoneNumberCard"
import { CompanyProfileInterface } from "../models/Profile/Interface/CompanyProfile/CompanyProfile"
import { UserProfileInterface } from "../models/Profile/Interface/UserProfile/UserProfile"
import { CourierProfileInterface } from "../models/Profile/Interface/CourierProfile/CourierProfile"
import { GoLocation } from "react-icons/go"
import { AuthTypeIcon } from "@components/Icons/AuthTypeIcon/AuthTypeIcon"
import { useNavigate } from "react-router"
import { authSliceActions } from "../slices/authSlice"

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

Profile.AuthPassword = function AuthPassword(){
    return(
        <AuthPasswordCard/>
    )
}

Profile.AuthEmail = function AuthEmail(){
    return(
        <AuthEmailCard/>
    )
}

Profile.AuthPhoneNumber = function AuthPhoneNumber(){
    return(
        <AuthPhoneNumberCard/>
    )
}

Profile.SecondName = function SecondName(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    let secondName = ''
    if(profile.auth.type === 'COMPANY'){
        secondName = (profile as CompanyProfileInterface).first_name +  " " +(profile as CompanyProfileInterface).first_name
    } else {
        secondName = (profile as UserProfileInterface|CourierProfileInterface).username
    }
    return(
        <h1 {...attr} className={tailwindMerge('',attr.className)}>{secondName}</h1>
    )
}

Profile.Email = function Email(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    return(
        <span {...attr} className={tailwindMerge("",attr.className)}>{profile.auth.email}</span>
    )
}

Profile.Name = function Name(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    let name = ''
    if(profile?.auth.type === 'COMPANY'){
        name = (profile as CompanyProfileInterface).company_name
    } else {
        name = (profile as UserProfileInterface|CourierProfileInterface).first_name + " " + (profile as UserProfileInterface|CourierProfileInterface).last_name
    }
    return <h1 {...attr} className={tailwindMerge("",attr.className)}>{name}</h1>
}

Profile.Address = function Address(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return

    return (
        <div {...attr} className={tailwindMerge("w-full flex flex-row gap-2 justify-items-center text-sm font-thin",attr.className)}>
            <div>
                <GoLocation/>
            </div>
            <span className="text-wrap">{profile.address.full_address}</span>
        </div>
    )
}

Profile.ProfileTypeIcon = function ProfileTypeIcon(attr:React.HTMLAttributes<HTMLElement>){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    const type = profile.auth.type

    return <AuthTypeIcon type={type} {...attr}className={tailwindMerge("absolute text-2xl -bottom-0 trans md:text-4xl translate-x-1/2 md:-bottom-2  right-[30%] md:right-[27.5%]",attr.className)}/>
}

Profile.Logout = function Logout(attr:React.HTMLAttributes<HTMLElement>){
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const onClick = (e:React.MouseEvent<HTMLElement>)=>{
        dispatch(authSliceActions.clearSession())
        dispatch(authSliceActions.clearProfile())
        
        navigator('/login/')
        attr.onClick?.(e)
    }
    return(
        <button {...attr} className={tailwindMerge("self-end px-4 py-1 text-sm font-medium rounded-full w-max bg-orange-red",attr.className)}
            onClick={onClick}
        >
            LOGOUT
        </button>
    )
}