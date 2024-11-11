import { AnimationPlaceholderInput,AnimationPlaceholderInputProps } from "../inputs/AnimationPlaceholderInput"
import {  useState } from "react"

export function UserAccount(){
    const [userAccount,setUser] = useState({
        'email':'',
        'password':'',
        'conferm_password':'',
        'phone_number':''
    })
    // Function triggered when a value of the input changess
    const setValue = (name:string,value:string)=>{
        setUser((oldUserInfo)=>{
            return {...oldUserInfo,[name]:value}
        })
    }
    const userInfoForms:Array<AnimationPlaceholderInputProps> = [
        {
            labelName:'PHONE NUMBER',
            type:'text'   ,
            name:'phone_number',
            value:userAccount.phone_number,
            setValue:setValue
        },
        {
            labelName:'EMAIL',
            type:'text'   ,
            name:'email',
            value:userAccount.email,
            setValue:setValue
        },
        {
            labelName:'PASSWORD',
            type:'text'   ,
            name:'password',
            value:userAccount.password,
            setValue:setValue
        },
        {
            labelName:'CONFERM PASSWORD',
            type:'text'   ,
            name:'conferm_password',
            value:userAccount.conferm_password,
            setValue:setValue
        }
    ]
    return (
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