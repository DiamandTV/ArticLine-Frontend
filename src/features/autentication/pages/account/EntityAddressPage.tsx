import { DivRefProvider } from "@context/DivRefContext/DivRefProvider";
import { Profile } from "@features/autentication/compositions/Profile";
import { useRef } from "react";

export function EntityAddressPage(){
    const divRef = useRef<HTMLDivElement|null>(null)
    return(
        <div className="flex flex-row jusitfy-center items-center w-full gap-2">
            <div className="flex flex-col w-full gap-1">
                <DivRefProvider divRef={divRef}>
                    <Profile.EntityAddressAddButton/>
                    <Profile.EntityAddressList />
                </DivRefProvider>
            </div>
            <div className="h-full w-max" ref={divRef}/>
        </div>
    )
}