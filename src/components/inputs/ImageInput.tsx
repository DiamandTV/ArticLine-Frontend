import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { mergeRefs } from "@utils/mergeRefs/mergeRefs"
import { cloneElement, isValidElement, useEffect, useRef } from "react"
import { Button } from "react-bootstrap"

const DEFAULT_BACKGROUND_IMAGE_INPUT = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg'



interface ImageInputProps extends React.HTMLAttributes<HTMLElement>{
    image?:FileList | null | undefined,
    onDelete:()=>void,
    isInvalid:boolean,
    inputElement:React.ReactNode,
    errorElement:React.ReactNode,
}

export function ImageInput(props:ImageInputProps)  {
    const className = tailwindMerge("w-[300px] flex flex-col gap-4 "+props.className)

    const inputRef = useRef<HTMLInputElement|null>(null)
    const imageRef = useRef<HTMLImageElement|null>(null)
    
    //console.log((props.inputElement as React.ReactElement)?.props?.ref)
    //const inputProps = (props.inputElement as React.ReactElement)
    
    const ref = (props.inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>).props.ref
    const mergedRef = mergeRefs<HTMLInputElement>(inputRef,ref)
    
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

    const getImage = (fileList:FileList|null|undefined)=>{
        if(fileList?.length){
            const reader = new FileReader()
            reader.readAsDataURL(fileList[0])
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
        getImage(props.image)
    },[props.image])
    console.log(props.image)
    return(
        <div 
            {...props}
            className={className} >
            <div  className="flex flex-col justify-content-center">
                <img  
                ref={imageRef}
                //src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                src={DEFAULT_BACKGROUND_IMAGE_INPUT}
                alt="example placeholder" className={"rounded-xl "} />
                {
                    isValidElement(props.inputElement) ? 
                    cloneElement(props.inputElement as React.ReactElement<React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>,HTMLInputElement>>,{ref:mergedRef}) : null
                }
                {props.errorElement}
            </div>
            <div className="flex flex-row justify-content-center relative gap-2">
                <Button variant="primary" className="w-full" onClick={onChooseClick}>
                    CHOOSE
                </Button>
                {
                    props.image?.length && props.image[0].name ?
                    <Button variant="danger" onClick={()=>{
                        props.onDelete()
                    }}>
                        DELETE
                    </Button> : null
                }
            </div>
        </div>
    )
}