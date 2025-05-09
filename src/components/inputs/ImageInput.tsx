import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { mergeRefs } from "@utils/mergeRefs/mergeRefs"
import {  useEffect, useRef } from "react"
import { Button, Form, FormControl } from "react-bootstrap"
import { useFormContext } from "react-hook-form"

const DEFAULT_BACKGROUND_IMAGE_INPUT = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'



interface ImageInputProps extends React.HTMLAttributes<HTMLElement>{
    id:string
}

export function ImageInput({id,...attr}:ImageInputProps)  {
    const className = tailwindMerge("max-w-[350px]  flex flex-col gap-4 ",attr.className)
    const {register,watch,setValue,formState:{errors}} = useFormContext()
    const fileImage = watch(id)
    const inputRef = useRef<HTMLInputElement|null>(null)
    const imageRef = useRef<HTMLImageElement|null>(null)
    const mergeRef = mergeRefs(register(id).ref,inputRef)
    //console.log((props.inputElement as React.ReactElement)?.props?.ref)
    //const inputProps = (props.inputElement as React.ReactElement)
    //const image = props.image?.length ? await props.image[0].stream().getReader().read() : 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'
    
    
    const onChooseClick = (event: React.MouseEvent<HTMLElement>)=>{
        event.stopPropagation()
        if(inputRef.current){
            inputRef.current.click()
        }
    }


    
    const resetImage = ()=>{
        if(imageRef.current){
            imageRef.current.src = DEFAULT_BACKGROUND_IMAGE_INPUT
        }
    }

    const setImage = (imageName:string)=>{
        if(imageRef.current){
            imageRef.current.src = imageName
        }
    }

    const getImage = async (file?:File|null)=>{
        if(file){
            console.log(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e)=>{
                if(imageRef.current ){
                    if(e.target?.result){
                        setImage(e.target.result as string)
                    } else {
                        resetImage()
                    }
                }
            }
        }
        resetImage()
    }

    useEffect(()=>{
        const file: File | null = fileImage;
        getImage(file) 
        console.log(fileImage)
    },[fileImage])

    const onInputCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        console.warn(file)
        setValue(id,file,{shouldValidate:true}); // Passiamo solo il File singolo, non la FileList
    };


    return(
        <div 
            {...attr}
            className={className} >
            <div  className="flex flex-col justify-content-center">
                <img  
                    ref={imageRef}
                    //src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                    src={DEFAULT_BACKGROUND_IMAGE_INPUT}
                    //alt="example placeholder" 
                    className={"rounded-xl max-h-80"} 
                />
               
                <Form.Control {...register(id)} onInputCapture={onInputCapture} onFocusCapture={undefined} onChange={undefined}  ref={mergeRef}  isInvalid={!!errors.image} type="file" accept="image/*" hidden/>
                <FormControl.Feedback type="invalid">
                    {errors?.[id]?.message as string|undefined}
                </FormControl.Feedback>
        
            </div>
            <div className="flex flex-row justify-content-center relative gap-2">
                <Button variant="primary" className="w-full" onClick={onChooseClick}>
                    CHOOSE
                </Button>
                {
                    watch(id) ?
                    <Button variant="danger" onClick={()=>{
                        setValue(id,'')
                    }}>
                        DELETE
                    </Button> : null
                }
            </div>
        </div>
    )
}