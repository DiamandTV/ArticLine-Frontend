import { PasswordResetCheckResponseStatus } from "./PasswordResetCheckResponse"

export enum PasswordResetResponseStatus{
    TOKEN_INVALID = PasswordResetCheckResponseStatus.TOKEN_INVALID,
    TOKEN_EXPIRED = PasswordResetCheckResponseStatus.TOKEN_EXPIRED, 
    LINK_EXPIRED = 10,
    PASSWORD_CHANGED = 11
}

export type PasswordResetResponseType = 
    'TOKEN INVALID' |
    'TOKEN-EXPIRED' |
    'LINK-EXPIRED'  |
    'PASSWORD CHANGED'


export const PasswordResetResponseMapStatusType:Record<PasswordResetResponseType,PasswordResetResponseStatus> = {
    'TOKEN INVALID':PasswordResetResponseStatus.TOKEN_INVALID,
    'TOKEN-EXPIRED':PasswordResetResponseStatus.TOKEN_EXPIRED,
    'LINK-EXPIRED':PasswordResetResponseStatus.LINK_EXPIRED,
    'PASSWORD CHANGED':PasswordResetResponseStatus.PASSWORD_CHANGED
}
