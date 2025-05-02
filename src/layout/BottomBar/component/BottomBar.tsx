import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { createContext, useContext } from "react"

const BottomNavigationContext = createContext<{state:number,
    setState:(newState:number)=>void}>({
    state:0,
    setState:()=>{}
})

interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement>{
    state:number,
    setState:(newState:number)=>void,
    children:React.ReactNode
}

export function BottomNavigation({state,setState,children}:BottomNavigationProps){
    return(
        <BottomNavigationContext.Provider value={{state,setState}}>
            <nav className="w-full min-h-14 max-h-40 flex flex-row justify-between items-center fixed z-50 bottom-0 rounded-t-2xl px-4 py-2 bg-surface-a0 ">
                {children}
            </nav>
        </BottomNavigationContext.Provider>
    )
}


interface ItemProps extends React.HTMLAttributes<HTMLElement>{
    index:number,
    label?:React.ReactNode,
    icon:React.ReactNode,
}
BottomNavigation.Item = function Item({index,label,icon,...props}:ItemProps){
    const {state,setState} = useContext(BottomNavigationContext)
    const className = tailwindMerge(`w-max h-max flex flex-col justify-center items-center font-sans text-base gap-0.5 hover:cursor-pointer ${state !== index ? 'text-surface-a30' : 'text-surface-a0'} `+props.className)
    const onClick = (event:React.MouseEvent<HTMLElement, MouseEvent>)=>{
        props.onClick?.(event)
        setState(index)
    }
    return(
        <div {...props} className={className} onClick={onClick}>    
            {icon}
            {label}
        </div>
    )
} 


BottomNavigation.ImportantItem = function ImportantItem({index,label,icon,...props}:ItemProps){
    //const before = "before:context-[''] before:absolute before:w-[20px] before:h-[20px] before:-left-[20px] before:top-[45px] before:rounded-tr-xl before:bg-green-600 before:shadow-store-button-box-shadow-right"
    //const after = "after:context-[''] after:absolute after:w-[20px] after:h-[20px] after:-right-[20px] after:top-[52px] after:rounded-tl-full after:bg-red-800 after:shadow-store-button-box-shadow-left"
    const {setState} = useContext(BottomNavigationContext)
    const className = tailwindMerge(`absolute rounded-full w-max h-max flex flex-col justify-center items-center font-sans text-base gap-0.5 box-content -translate-y-full -translate-x-1/2 p-3 bg-primary-a40 border-8 border-surface-a20 hover:cursor-pointer ${props.className}` )
    const onClick = (event:React.MouseEvent<HTMLElement, MouseEvent>)=>{
        props.onClick?.(event)
        setState(index)
    }
    return(
        <div className={"relative "}>
            <div {...props} className={className} onClick={onClick}>
                {icon}
                {label}
            </div>
        </div>
    )
}

