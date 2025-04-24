import { NavigatorContext } from "@context/NavigatorContext/NavigatorContext";
import { useContext } from "react";
import { useNavigate as originalNavigate } from "react-router";

export function useGlobalNavigate(){
    const navigator = useContext(NavigatorContext)  
    if(navigator){
        return navigator
    }
    return originalNavigate()
}