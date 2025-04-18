import { WithRequiredProperty } from "@utils/typescript/withRequiredProperty";
import { UseMutationOptions } from "react-query";

type SigninMutationOptionsParams = WithRequiredProperty<UseMutationOptions<unknown,unknown,unknown,unknown>,'mutationKey'|'mutationFn'>
export function siginMutationOptions(params:SigninMutationOptionsParams):UseMutationOptions<unknown,unknown,unknown,unknown>{
    const onError = async (error: unknown, variables: unknown, context: unknown)=>{
        await params.onError?.(error,variables,context)
        
    }
    const onSuccess = async(data:unknown,variables: unknown, context: unknown)=>{
        await params.onSuccess?.(data,variables,context)
    }
    return{
        ...params,
        mutationKey:['signin',...params.mutationKey],
        onError,
        onSuccess
    }
}