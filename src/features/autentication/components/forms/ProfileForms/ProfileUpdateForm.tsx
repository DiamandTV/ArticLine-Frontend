import { useDispatch, useSelector } from "react-redux";
import { getProfileInfoFieldsProviderFactory } from "../../fields/ProfileInfo/ProfileInfoFieldsProviderFactory";
import { RootState } from "@store/store";
import { ProfileInfoFieldsFactory } from "../../fields/ProfileInfo/ProfileInfoFieldsFactory";
import { Button } from "react-bootstrap";
import { DefaultResetter } from "@components/forms/Resetter/DefaultResetter";
import { UserProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType";
import { CompanyProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { CourierProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { profileToFields } from "@features/autentication/utils/formTransformers/profile/profileTransformers";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { profileCacheKey } from "@features/autentication/data/query";
import { profileServices } from "@features/autentication/services/profileServices";
import { ProfileInfoFieldsType } from "@features/autentication/models/Profile/Interface/Type";
import { authSliceActions } from "@features/autentication/slices/authSlice";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";

export function ProfileUpdateForm(){
    const profile = useSelector((state:RootState)=>state.authReducer.profile)
    if(!profile) return
    const ProfileInfoFieldsProvider = getProfileInfoFieldsProviderFactory({profileType:profile.auth.type})
    return(
        <div className="w-full flex flex-col gap-2 max-w-[1000px] rounded-lg ">
            <ProfileInfoFieldsProvider>
                <DefaultResetter<UserProfileInfoFieldsType | CourierProfileInfoFieldsType | CompanyProfileInfoFieldsType> toFields={async()=>await profileToFields(profile)}/>
                <ProfileInfoFieldsFactory profileType={profile.auth.type} className="flex flex-col items-center justify-center"/>
                <UpdateButton/>
            </ProfileInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(){
    const dispatch = useDispatch()
    const {trigger,getValues,formState:{isDirty},setError} = useFormContext()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[profileCacheKey.update],
        mutationFn:async(profileInfo:ProfileInfoFieldsType)=>profileServices.update(profileInfo),
        onSuccess:(data)=>{
            const profile:ProfileInfoFieldsType = data.data
            dispatch(authSliceActions.setProfile(profile))
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                setServerValidationErrors(error,setError,[])
            }
        }
    })
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const profileInfo = getValues()
            console.log(profileInfo)
            await mutateAsync(profileInfo as ProfileInfoFieldsType)
        }
    }
    return(
        <Button 
            className="text-sm font-medium"
            disabled={!isDirty || isLoading}
            onClick={onClick}
        >
            SAVE
        </Button>
    )
}