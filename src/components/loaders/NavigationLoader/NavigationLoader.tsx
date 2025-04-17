import { useNavigation } from "react-router"
import { SimpleLoader } from "../SimpleLoader/SimpleLoader"

interface NavigationLoaderProps{
    children:React.ReactNode    
}
export function NavigationLoader(props:NavigationLoaderProps){
    const navigation = useNavigation()
    if(navigation.state === 'loading'){
        return <SimpleLoader/>
    }
    return props.children
}