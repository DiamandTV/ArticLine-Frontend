import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import { memo, useState } from "react"
/*
    interface UserInfoProps{
        username:string,
        firstName:string,
        lastNamse:string,
        dateOfBirth:string
    }
*/
export function UserInfo(){
    const [userInfo,setUser] = useState({
        username:'',
        firstName:'',
        lastName:'',
        dateOfBirth:''
    })
    // Function triggered when a value of the input changess
    const setValue = (name:string,value:string)=>{
        setUser((oldUserInfo)=>{
            return {...oldUserInfo,[name]:value}
        })

    }
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'FIRST NAME',
            type:'text'   ,
            name:'firstName',
            value:userInfo.firstName,
            setValue:setValue
        },
        {
            labelName:'LAST NAME',
            type:'text'   ,
            name:'lastName',
            value:userInfo.lastName,
            setValue:setValue
        },
        {
            labelName:'USERNAME',
            type:'text'   ,
            name:'username',
            value:userInfo.username,
            setValue:setValue
        },
        {
            labelName:'DATE OF BIRTH',
            type:'text'   ,
            name:'dateOfBirth',
            value:userInfo.dateOfBirth,
            setValue
            :setValue
        }
    ]
    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 ">
            {userInfoForms.map((form)=>
                <AnimationPlaceholderInput 
                    key={form.name}
                    labelName={form.labelName}
                    type={form.type}
                    name={form.name}
                    value={form.value}
                    setValue={form.setValue}
                />
            )}  
        </div>
    )
}