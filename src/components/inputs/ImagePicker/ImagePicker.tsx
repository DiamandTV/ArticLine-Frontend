import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";


export function ImagePicker({image,setImage}:{image:string|null,setImage:(image:string)=>void}){
    const imageRef = useRef<HTMLInputElement | null>(null)

    return (
        <>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e)=>{
                if(e.target! && e.target.files ){
                  const file =  URL.createObjectURL(e.target.files[0])
                  console.log(file)
                  setImage(file)
                }
              }}
              ref={imageRef}/>
            <div 
                className="w-72 h-80 bg-slate-900 bg-no-repeat bg-cover bg-center bg-opacity-60 backdrop-blur-lg rounded-xl flex flex-col justify-center items-center border-2 border-gray-400 hover:cursor-pointer"
                style={{backgroundImage:`url(${image})`}}
                onClick={()=>{
                  if(imageRef){
                    console.log("Ok")
                    imageRef.current?.click()
                  }
                }}
                >
                    {!image && <FaPlus size={25}/>}
            </div>
          </>
    )
}