import { useContext, useEffect, useRef, useState } from "react";
import { ImagePicker } from "../inputs/ImagePicker/ImagePicker";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { StepperButtons } from "../stepper/StepperButtons";
import { InputError } from "../inputs/InputError/InputError";
import { StepperContext } from "../stepper/StepperContext";
import { v4 as uuidv4 } from "uuid";
export function StoreImageForm(){
    const {stepper:{state,setState,maxStep},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)
    const [images,setImages] = useState<Array<string | null>>((record[state] && record[state].images) ? record[state].images : [null])
    const [error,setErrors] = useState(errorStepper.images ? errorStepper.images : null)
    const divRef = useRef<HTMLDivElement | null>(null)

    console.log(record)
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
        console.log(record)
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
                </div>
            </div>
            <div 
                ref={divRef}
                className="w-full grid gap-2 grid-flow-col justify-start items-center overflow-hidden">
                {images.map((image,index)=>  (
                    <div className="relative w-full">
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
                            key={uuidv4()}
                            image={images[index]!} 
                            setImage={(image)=>{
                                const _images = [...images]
                                _images[index] = image as string
                                const newRecord = record
                                newRecord[state] = {
                                    'images':_images
                                }
                                setRecord(newRecord)
                                setImages(_images)
                            }}
                        />
                </div>)
             )}
            </div>
            <div className="w-full">
                <StepperButtons
                    onNextClick={()=>{
                        if(images.filter((image)=>image!=null).length === 0){
                            setErrors(["You have to choose an iamge for your store. It will be better if tou choose five of them"])
                        } else {
                            setState(state+1)
                        }
                    }}
                />
            </div>
        </div>
    )
}