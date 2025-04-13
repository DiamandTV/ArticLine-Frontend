import { SigninFields } from '../../fields/Signin/SigninFields'
import { SigninFieldsProvider } from '../../fields/Signin/SigninFieldsProvider'

export function _Create(){
    return(
        <SigninFieldsProvider>
            <SigninFields/>
        </SigninFieldsProvider>
    )
}
