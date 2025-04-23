export enum VerificationResponseStatus {
    VERIFIED,
    EXPIRED,
    ALREADY_VERIFIED,
    BAD_REQUEST,
    EMAIL_INVALID
}

export type VerificationResponseType = 
    'ALREADY-VERIFIED' | 
    'EMAIL-LINK-EXPIRED' | 
    'EMAIL-LINK-INVALID'

export const VerificationResponseMapStatusType:Record<VerificationResponseType,VerificationResponseStatus> = {
    'ALREADY-VERIFIED':VerificationResponseStatus.ALREADY_VERIFIED,
    'EMAIL-LINK-EXPIRED':VerificationResponseStatus.EXPIRED,
    'EMAIL-LINK-INVALID':VerificationResponseStatus.EMAIL_INVALID
}