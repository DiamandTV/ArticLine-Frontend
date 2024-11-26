import { StartView } from '../views/StartView';
import { UserLogin } from '../components/loginSteps/UserLogin';
export function LogIn(){
    return (   
        <StartView>
            <UserLogin/>
        </StartView>
    )
}