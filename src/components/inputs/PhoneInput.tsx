import { Dropdown, FloatingLabel, InputGroup, InputGroupProps } from "react-bootstrap";
import phoneNumbers from '@assets/json/phoneNumber/phoneNumbers.json'
import { cloneElement, FormEvent, isValidElement, useEffect, useRef, useState } from "react";
import { mergeRefs } from "@utils/mergeRefs/mergeRefs";

interface PhoneNumberDetailInterface  {
    name: string;
    dial_code: string;
    code: string;
}

interface PhoneInputProps extends React.HTMLAttributes<HTMLElement> , InputGroupProps{
    inputElement:React.ReactNode,
    errorElement:React.ReactNode,
    readonly?:boolean
}

// todo: create a react form hook input
export function PhoneInput({inputElement,errorElement,readonly=false,...attributes}:PhoneInputProps){
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    const [phoneNumberDetail,setPhoneNumberDetail] = useState<PhoneNumberDetailInterface>({
        code:'it',
        dial_code:'+39',
        name:'italy'
    })
    const elementProps = (inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>).props
    const mergeRef = mergeRefs(inputRef,elementProps.ref)

    const image = `https://flagpedia.net/data/flags/h80/${phoneNumberDetail.code.toLowerCase()}.png`

    useEffect(()=>{
        if(inputRef){
            const actualPhoneNumber = inputRef.current?.value
            if(actualPhoneNumber){
                const divider = actualPhoneNumber.indexOf(" ")
                if(divider > 0){
                    inputRef.current!.value = phoneNumberDetail.dial_code+" "+actualPhoneNumber.slice(phoneNumberDetail.dial_code.length+1)
                    return
                }
                
            }
            if(actualPhoneNumber?.replace(" ","").length === 0){
                inputRef.current!.value+= phoneNumberDetail.dial_code+" "
            }
        }   
    },[phoneNumberDetail])

    const onChange = (event:FormEvent<HTMLInputElement>)=>{
        elementProps.onChange?.(event)
        const actualPhoneNumber = inputRef.current?.value
        if(actualPhoneNumber ){
            if( actualPhoneNumber.indexOf(phoneNumberDetail.dial_code) === -1 ){
                inputRef.current!.value = phoneNumberDetail.dial_code+" "+actualPhoneNumber.slice(phoneNumberDetail.dial_code.length)
            } else if(actualPhoneNumber.indexOf(" ") === -1){
                inputRef.current!.value = phoneNumberDetail.dial_code+" "+actualPhoneNumber.slice(phoneNumberDetail.dial_code.length)
            
            }
        }            
    
        
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
        if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    return(
        <InputGroup className="p-0" {...attributes}>
            <Dropdown >
                <Dropdown.Toggle disabled={readonly} variant="secondary" id="dropdown-basic" className="flex flex-row justify-center items-center gap-0.5 md:gap-2">
                    <img src={image} width={"30"} />
                </Dropdown.Toggle>
           
                <Dropdown.Menu>
                    <div className="overflow-hidden overflow-y-scroll max-h-60">
                    {phoneNumbers.map((detail)=>{
                        return (
                            <PhoneNumberDetail 
                                onClick={()=>{
                                    setPhoneNumberDetail(detail)
                                }}
                                phoneNumberDetail={detail}/>
                        )
                    })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <FloatingLabel  label="PHONE NUMBER">
                {
                    isValidElement(inputElement) ?
                    cloneElement(inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>,{...elementProps,ref:mergeRef,onChange,onKeyDown}) 
                    : null
                }
                {errorElement}
            </FloatingLabel>
        </InputGroup>
    )
}

interface PhoneNumberDetailProps extends React.HTMLAttributes<HTMLElement> {
    phoneNumberDetail: {
        name: string;
        dial_code: string;
        code: string;
    }
}
function PhoneNumberDetail({phoneNumberDetail,...attributes}:PhoneNumberDetailProps){
    const image = `https://flagpedia.net/data/flags/h80/${phoneNumberDetail.code.toLowerCase()}.png`
    return(
        <Dropdown.Item {...attributes}>
            <div className="flex flex-row items-center justify-between w-full">
                <span>{phoneNumberDetail.dial_code}</span>
                <img src={image}  width={"60px"}/>
            </div>
        </Dropdown.Item>
    )
}