import { useEffect, useRef, useState } from "react";
import { ImagePicker } from "../inputs/ImagePicker/ImagePicker";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { StepperButtons } from "../stepper/StepperButtons";
import { InputError } from "../inputs/InputError/InputError";
export function StoreImageForm(){
    const [images,setImages] = useState<Array<string | null>>([])
    const [error,setErrors] = useState(null)
    const divRef = useRef<HTMLDivElement | null>(null)

    const onScroll = (e:WheelEvent)=>{
        e.preventDefault()
        if(e.deltaY == 0) return;
        divRef.current!.scrollLeft = divRef.current!.scrollLeft + e.deltaY
        
        console.log( divRef.current!.scrollLeft + e.deltaY)
    }

    useEffect(()=>{
        if(divRef){
            divRef.current?.addEventListener('wheel',onScroll)
            return ()=> divRef.current?.removeEventListener('wheel',onScroll)
        }
    },[])
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex flex-row justify-between items-center gap-x-2">
                <div className="relative">
                    <InputError error={error}/>
                </div>
                <div className="max-w-max flex flex-row justify-center items-center gap-x-2">
                    { images.length < 5 ?  
                            <div 
                            className="hover:cursor-pointer hover:bg-sky-300 box-content p-1.5 bg-sky-500 rounded-full"
                            onClick={()=>{
                                if(images.length < 5 && !images.includes(null)) setImages([...images,null])
                                else if(images.length < 5){
                                    setErrors(["You can't put more than five images for the store"])
                                    setTimeout(()=>{
                                        // todo:sistemarlo per metterlo nell effect in modo da avere una funziona di ritorno che canella automaticamente il listener
                                        setErrors(null)
                                    },4000)
                                } else setErrors("Before setting another image please use this input")
                            }}>
                            <FaPlus size={15}/>
                        </div> : null
                    }
                    { images.length != 0 ? 
                        <div 
                            className="hover:cursor-pointer hover:bg-red-300 box-content p-1.5 bg-red-500 rounded-full"
                            onClick={()=>{
                                if(images.length < 5) setImages([...images,null])
                            }}>
                            <RiDeleteBin5Fill size={15}/> 
                        </div> : null
                    }
                </div>
            </div>
            <div 
                ref={divRef}
                className="w-full grid gap-2 grid-flow-col justify-start items-center overflow-hidden">
                {images.map((image,index)=>  <ImagePicker 
                image={images[index]!} 
                setImage={(image)=>{
                    const _images = [...images]
                    _images[index] = image as string
                    setImages(_images)
                }}
            /> )}
            </div>
            <div className="w-full">
                <StepperButtons
                    onNextClick={()=>{
                        if(images.length == 0){
                            setErrors(["You have to choose an iamge for your store. It will be better if tou choose five of them"])
                        }
                    }}
                />
            </div>
        </div>
    )
}