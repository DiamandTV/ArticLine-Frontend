import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { InputError } from "../InputError/InputError";
import { FieldError } from "react-hook-form";


export function ImagePicker({image,setImage,error,className}:{image:string|null,setImage:(image:string)=>void,error?:FieldError | undefined,className?:string}){
    const imageRef = useRef<HTMLInputElement | null>(null)

    return (
        <>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e)=>{
                if(e.target! && e.target.files ){
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  if(reader) reader.onload! = ()=>{
                    if(reader.result) setImage(reader.result as string)
                  }
                }
              }}
              ref={imageRef}/>
            <div 
                className={"w-72 h-80 bg-slate-900 bg-no-repeat bg-cover bg-center bg-opacity-60 backdrop-blur-lg rounded-xl flex flex-col justify-center items-center border-2 border-gray-400 hover:cursor-pointer "+className}
                style={{backgroundImage:`url(${image})`}}
                onClick={()=>{
                  if(imageRef){
                    console.log("Ok")
                    imageRef.current?.click()
                  }
                }}
                >
                    <div className="absolute top-0 left-0 p-2">
                      <InputError  error={error}/>
                    </div>
                    {!image && <FaPlus size={25}/>}
            </div>
          </>
    )
}