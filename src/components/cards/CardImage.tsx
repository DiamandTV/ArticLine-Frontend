import { FaHeart } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export function CardImage({image,className,imageClassName,settings=true}:{image?:string|null,className?:string,imageClassName?:string,settings?:boolean}){
    return(
        <div className={"w-full h-60 bg-transparent bg-no-repeat bg-center bg-cover rounded-t-lg "+className} style={{backgroundImage:`url(${image})`}}>
            <div className={"w-full flex flex-row justify-between items-center px-2 py-2 rounded-xl " +imageClassName}>
                {settings ?
                    <>
                        <FaHeart size={20}/>
                        <IoMenu size={22}/>
                    </>
                : null}
            </div>
        </div>
    )
}