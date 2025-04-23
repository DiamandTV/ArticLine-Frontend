export enum VerificationResendResponseStatus{
    EMAIL_ERROR,
    EMAIL_REQUEST_LIMIT
}

export type VerificationResendResponseType = 
    'EMAIL-LINK-ERROR' | 
    'EMAIL-LINK-RECENT-REQUEST'

export const VerificationResendResponseMapStatusType:Record<VerificationResendResponseType,VerificationResendResponseStatus> = {
    'EMAIL-LINK-ERROR':VerificationResendResponseStatus.EMAIL_ERROR,
    'EMAIL-LINK-RECENT-REQUEST':VerificationResendResponseStatus.EMAIL_REQUEST_LIMIT
}