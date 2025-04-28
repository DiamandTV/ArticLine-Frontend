import { cloneElement, useState } from "react";
import { BottomNavigation as ButtonNavigationComponent

    
 } from "src/layout/BottomBar/component/BottomBar";
import { IoHome, IoSearch, IoBag, IoPerson,IoStorefront } from "react-icons/io5";
import { getKey } from "@lib/kegGenerator/keyGenerator";

const ICONS = [
    <IoHome/>,<IoSearch/>,<IoBag/>,<IoPerson/>
]


export function BottomNavigation(){
    const [state,setState] = useState(0)
    return(
        <ButtonNavigationComponent 
            state={state}
            setState={setState}
        >
                {ICONS.map((icon,index)=>{
                    //const iconsSize = index === state ? ICON_SIZE + 7.5 : ICON_SIZE
                    const iconClassName = `transition-all ease-linear duration-150 ${state === index ? 'text-3xl' : 'text-xl'}`
                    return(
                        <>
                            {
                                ICONS.length / 2 === index ? 
                                <ButtonNavigationComponent.ImportantItem key={getKey()} index={4} icon={<IoStorefront className={`transition-all ease-linear duration-150 text-4xl`}/>}/>
                                : null
                            }
                            <ButtonNavigationComponent.Item key={getKey()} index={index} icon={cloneElement(icon,)} className={iconClassName}/>
                        </>
                    )
                })}
                
        </ButtonNavigationComponent>
    )
}