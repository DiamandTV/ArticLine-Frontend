export enum PasswordResetCheckResponseStatus{
    TOKEN_EXPIRED,
    TOKEN_INVALID,
    TOKEN_VERIFIED
}

export type PasswordResetCheckResponseType = 
    'TOKEN-EXPIRED' | 
    'TOKEN-INVALID' | 
    'TOKEN_VERIFIED'

export const PasswordResetCheckResponseMapStatusType:Record<PasswordResetCheckResponseType,PasswordResetCheckResponseStatus> = {
    'TOKEN-EXPIRED':PasswordResetCheckResponseStatus.TOKEN_EXPIRED,
    'TOKEN-INVALID':PasswordResetCheckResponseStatus.TOKEN_INVALID,
    'TOKEN_VERIFIED':PasswordResetCheckResponseStatus.TOKEN_VERIFIED
}