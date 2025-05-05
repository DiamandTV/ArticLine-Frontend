import { useEffect, useState } from "react";
import { BottomNavigation as ButtonNavigationComponent } from "src/layout/BottomBar/component/BottomBar";
import { IoHome, IoCart, IoLayers, IoAddCircle,IoCompass } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { pathMatcher } from "@utils/pathMatcher/pathMatcher";



const getIconClassName = (state:number,index:number)=>{
    return `transition-all ease-linear duration-150 ${state === index ? 'text-3xl' : 'text-xl'}`
}


export function BusinessBottomNavigation() {
    const navigator = useNavigate()
    const location = useLocation()
    const [state, setState] = useState(0);

    const pathIndexMap = [
        '/store/',
        '/order/',
        '/',
        '/order-batch/',
        '/store/create/'
    ]

    useEffect(()=>{
        const currentIndex = pathMatcher(pathIndexMap,location.pathname)
        setState(currentIndex)
    },[location])

    useEffect(()=>{
        if(!location.pathname.includes(pathIndexMap[state])){
            navigator(pathIndexMap[state])
        }
        
    },[state])

    return (
        <ButtonNavigationComponent 
            state={state}
            setState={setState}
            
        >
            <ButtonNavigationComponent.Item index={0} icon={<IoHome className={getIconClassName(state,0)}/>}/>
            <ButtonNavigationComponent.Item index={1} icon={<IoCart className={getIconClassName(state,1)}/>}/>
            <ButtonNavigationComponent.ImportantItem index={2} icon={<IoCompass className={`transition-all ease-linear duration-150 text-4xl`}/>}/>
            <ButtonNavigationComponent.Item index={3} icon={<IoLayers className={getIconClassName(state,3)}/>}/>
            <ButtonNavigationComponent.Item index={4} icon={<IoAddCircle className={getIconClassName(state,4)}/>}/>      
        </ButtonNavigationComponent>
    );
}