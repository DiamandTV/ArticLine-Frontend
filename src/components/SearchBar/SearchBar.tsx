import { IoIosSearch } from "react-icons/io";
import { twMerge } from "tailwind-merge";
export interface SearchBarProps{
    className?:string,
    placeholder:string,

}
export function SearchBar({placeholder,className=""}:SearchBarProps){
    return(
        <div className= {twMerge(" max-full mx-4 px-2 flex flex-row justify-center items-center bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-md "+className)}>
            <IoIosSearch size={30} color="grey"/>
            <input type="text"  
            className="change-icon-to-white focus:outline-none focus:border-transparent border-transparent h-12 w-full border-b-2 bg-transparent px-2 text-lg"
            placeholder={placeholder}/>
        </div>
    )

}