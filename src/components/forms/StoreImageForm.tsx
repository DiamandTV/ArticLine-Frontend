import { useEffect, useRef, useState } from "react";
import { ImagePicker } from "../inputs/ImagePicker/ImagePicker";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { InputError } from "../inputs/InputError/InputError";
import { v4 as uuidv4 } from "uuid";
import { ImageModel } from "../../models/image";
import { FieldError, useFormContext } from "react-hook-form";
export function StoreImageForm({className}:{className?:string}){
    //const {stepper:{state,setState,/*maxStep*/singleLine},record:{record,setRecord},error:{errorStepper},/*beforeChangeMediaQuery:{setBeforeChangeMediaQuery}*/finish:{finish}} = useContext(StepperContext)
    const control = useFormContext()
    const {setValue,getValues,formState:{errors},setError} = control
    
    const [images,setImages] = useState<Array<ImageModel | null>>(
        (getValues('images') && getValues('images')) 
        ? 
        getValues('images') as Array<ImageModel | null>
        : 
        [{image:null}]
    )
    //const [error,setErrors] = useState(errorStepper.images ? errorStepper.images : null)
    const divRef = useRef<HTMLDivElement | null>(null)
    const onScroll = (e:WheelEvent)=>{
        e.preventDefault()
        if(e.deltaY == 0) return;
        divRef.current!.scrollLeft = divRef.current!.scrollLeft + e.deltaY
        //console.log( divRef.current!.scrollLeft + e.deltaY)
    }

    useEffect(()=>{
        if(divRef){
            divRef.current?.addEventListener('wheel',onScroll)
            return ()=> divRef.current?.removeEventListener('wheel',onScroll)
        }
        console.log(images)
        
    },[])

    // useEffect(()=>{
    //     console.log("OKdsds",state)
    //     if(finish && singleLine){
    //         setState(state+1)
    //     }
    // },[finish])

    return (
        <div className={"w-full flex flex-col justify-center items-center gap-y-4 "}>
            <div className="w-full h-full flex flex-row justify-between items-center gap-x-2">
                <div className="relative">
                    <InputError error={errors.images as FieldError | undefined}/>
                </div>
                <div className="max-w-max h-full flex flex-row justify-center items-center gap-x-2">
                    { images.length < 5 ?  
                            <div 
                            className="hover:cursor-pointer hover:bg-sky-300 box-content p-1.5 bg-sky-500 rounded-full"
                            onClick={()=>{
                                if(images.length < 5 && !images.includes(null)) setImages([...images,{image:null}])
                                else if(images.length < 5){
                                    setError('images',{type:"custom",message:"You can't put more than five images for the store"})
                                    setTimeout(()=>{
                                        // todo:sistemarlo per metterlo nell effect in modo da avere una funziona di ritorno che canella automaticamente il listener
                                        setError('images',{type:"custom",message:undefined})
                                    },4000)
                                } else setError('images',{type:"custom", message:"Before setting another image please use this input"})
                            }}>
                            <FaPlus size={15}/>
                        </div> : null
                    }
                </div>
            </div>
            <div 
                ref={divRef}
                className="w-full h-full grid gap-2 grid-flow-col justify-start items-center overflow-hidden">
                {images.map((image,index)=>  (
                    <div className="relative w-full" key={uuidv4()}>
                        { image ? 
                            <div 
                                className="max-w-max absolute z-10 top-2 right-2 hover:cursor-pointer hover:bg-red-300 box-content p-1.5 bg-red-500 rounded-full"
                                onClick={()=>{
                                    //if(images.length < 5) setImages([...images,null])
                                    setImages(images.filter((image,_index)=>_index != index))
                                }}>
                                <RiDeleteBin5Fill size={15}/> 
                            </div> : null
                        }
                        <ImagePicker 
                            className={className}
                            key={uuidv4()}
                            image={images[index] ? images[index].image : null} 
                            setImage={(image)=>{
                                console.log(getValues())
                                const _images = getValues('images') ? getValues('images') : []
                                _images[index]!.image= image as string
                                setValue('images',_images)
                                setImages(_images)
                                console.log(_images)
                                
                            }}
                        />
                </div>)
             )}
            </div>
        </div>
    )
}