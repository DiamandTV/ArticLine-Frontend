import { OpenStreetSearchContext } from "@context/OpenStreetSearchQueryContext/OpenStreetSearchContext"
import { OpenStreetSearchProvider } from "@context/OpenStreetSearchQueryContext/OpenStreetSearchProvider"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { mergeRefs } from "@utils/mergeRefs/mergeRefs"
import { TbLocationFilled } from "react-icons/tb";
import React, { cloneElement, FormEvent, isValidElement, useContext, useEffect, useRef, useState } from "react"
import { Button, FloatingLabel,  FloatingLabelProps,  InputGroup,  ListGroup } from "react-bootstrap"
import { openStreetMapRepository } from "src/respository/openStreetMapRepository/openStreetMapRepository";

const TIMEOUT_INPUT_QUERY = 2000
interface AddressInputInternProps extends FloatingLabelProps{
    inputElement:React.ReactNode,
    errorElement:React.ReactNode,
}
function AddressInputIntern(props:AddressInputInternProps){
    const className = tailwindMerge("relative "+props.className)
    
    const [focus,setFocus] = useState(false)

    const address = useRef<string>('')
    const timer = useRef<number|null>(null)
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    const elementProps = (props.inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>).props
    const mergeRef = mergeRefs(elementProps.ref,inputRef)

    const {data,mutateAsync} = useContext(OpenStreetSearchContext)

    const onChange = (event:FormEvent<HTMLInputElement>)=>{
        elementProps.onChange?.(event)
        address.current = event.currentTarget.value

        if(timer.current){
            clearTimeout(timer.current!)
        }

        timer.current = setTimeout(async()=>{
            alert(address.current)
            await mutateAsync?.(address.current)
        },TIMEOUT_INPUT_QUERY)

        setFocus(true)
    }


    const findPosition = ()=>{
        if(navigator.geolocation ){
            navigator.geolocation.getCurrentPosition(async(position)=>{
                const lat = position.coords.latitude
                const long = position.coords.longitude
                alert(lat)
                if(inputRef.current){
                    const display_address = await openStreetMapRepository.reverse({lat,long})
                    inputRef.current!.value = display_address
                }
            },
            (error)=>{
                console.log(error.message)
            },{
                
            })
        } else {
            alert("NAVIGATOR NOT AVAILABLE")
        }
    }

    useEffect(()=>{
        // clear the timeout on unmount
        return ()=>{
            if(timer.current){
                clearTimeout(timer.current)
            }
        }
    },[])

    return(
        <InputGroup>
            <FloatingLabel {...props} className={className}>
                {
                    isValidElement(props.inputElement) ? 
                    cloneElement(props.inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>,{...elementProps,ref:mergeRef,onChange})
                    : null
                }
                {props.errorElement}

                {
                    focus ? 
                    <ListGroup className="max-h-60 overflow-hidden overflow-y-scroll">
                        {data?.map((place,index)=>{
                            return (
                                <ListGroup.Item 
                                    key={index} 
                                    onClick={()=>{
                                        if(inputRef.current){
                                            inputRef.current!.value = place.display_name
                                        }
                                        setFocus(false)
                                    }}
                                    className="hover:bg-surface-a10 hover:cursor-pointer">
                                    {place.display_name}
                                </ListGroup.Item>
                            )
                        })}
                        
                    </ListGroup> : null
                }
            </FloatingLabel>
            <Button variant="secondary" className="px-4 max-h-16" onClick={()=>{
                findPosition()
            }}>
                <TbLocationFilled size={20}/>
            </Button>
        </InputGroup>
    )
}

export function AddressInput(props:AddressInputInternProps){
    return (
        <OpenStreetSearchProvider>
            <AddressInputIntern {...props}/>
        </OpenStreetSearchProvider>
    )
}