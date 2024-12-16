import { StartView } from '../views/StartView';
import { LoginForm } from '../components/Forms/LoginForm';
//import { HighlightedTitle } from '../components/Texts/HighlightedTitle';
export function LogIn(){
    return (   
        <StartView>
            <LoginForm/>
        </StartView>
    )
}