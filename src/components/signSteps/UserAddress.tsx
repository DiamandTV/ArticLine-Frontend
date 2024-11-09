import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { Dropdown } from "../inputs/Dropdown"
export function UserAddress(){
    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 ">
            <Dropdown/>

        </div>
    )
}