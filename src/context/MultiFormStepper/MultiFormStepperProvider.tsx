import { useMultiFormStepperProps } from "@models/multiFormStep/mutliFormStep";
import { MultiFormStepperContext } from "./MutliFormStepperContext";

interface MultiFormStepperProviderProps extends useMultiFormStepperProps{
    children:React.ReactNode
}
export function MultiFormStepperProvider(props:MultiFormStepperProviderProps){
    return(
        <MultiFormStepperContext.Provider value={{...props}}>
            {props.children}
        </MultiFormStepperContext.Provider>
    )
}