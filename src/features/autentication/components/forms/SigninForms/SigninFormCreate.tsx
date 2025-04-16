import { SigninFieldsFactory } from '../../fields/Signin/SigninFieldsFactory'
import { SigninFormProps } from './SigninForm'

export function _Create(props:SigninFormProps){
    return(
        <SigninFieldsFactory profileType={props.profileType}/>
    )
}
