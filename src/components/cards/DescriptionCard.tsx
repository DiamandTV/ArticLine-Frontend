import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

export function DescriptionCard(){
    return(
        <div className="flex flex-row justify-start items-center gap-2">
            <div className="flex flex-col justify-start gap-1">
                <div className="flex flex-row items-center gap-x-2 ">
                    <IoMdInformationCircleOutline size={25}/>
                    <span className="text-base">INFORMATION</span>
                </div>
                <span className="text-xs pl-[32px]">STORE INFO</span>
            </div>
            <MdKeyboardArrowRight size={32.5}/>
        </div>
    )
}