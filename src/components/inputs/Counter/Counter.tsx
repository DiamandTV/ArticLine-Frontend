import { FaMinus, FaPlus } from "react-icons/fa6";

export function Counter(){
    return (
        <div className="w-full h-full flex flex-row justify-center items-center px-10 gap-x-16">
            <div className="p-1 border-2 border-sky-400 rounded-full hover:cursor-pointer">
                <FaMinus size={25} color="rgb(56 189 248)"/>
            </div>
            <h1 className="text-3xl font-bold">{10}</h1>
            <div className="p-1  rounded-full order-2 border-2 border-sky-400 hover:cursor-pointer">
                <FaPlus size={25} color="rgb(56 189 248)"/>
            </div>

        </div>
    )
}