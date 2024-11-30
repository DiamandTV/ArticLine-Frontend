import { IoIosSearch } from "react-icons/io";
export interface SearchBarProps{
    placeholder:string
}
export function SearchBar({placeholder}:SearchBarProps){
    return(
        <div className= " max-full mx-4 px-2 flex flex-row justify-center items-center bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl">
            <IoIosSearch size={30} color="grey"/>
            <input type="text"  
            className="change-icon-to-white focus:outline-none focus:border-transparent border-transparent h-10 w-full border-b-2 bg-transparent px-2 text-lg"
            placeholder={placeholder}/>
        </div>
    )

}