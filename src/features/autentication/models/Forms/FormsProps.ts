import { FieldsProps } from "../Fields/FieldsProps";

export interface FormsProps extends FieldsProps{
    onFinish:()=>void,
    onError:()=>void,
    onSuccess:()=>void
}