import { SigninFieldsFactory } from '../../fields/Signin/SigninFieldsFactory'
import { SigninFormProps } from './SigninForm'

export function Create(props:SigninFormProps){
    return(
        <SigninFieldsFactory profileType={props.profileType}/>
    )
}
