import { StartView } from '../components/views/StartView'
import { UserLogin } from '../components/loginSteps/UserLogin';
export function LogIn(){
    return (   
        <StartView>
            <UserLogin/>
        </StartView>
    )
}