export enum AccountResponseStatus {
    ALREADY_VERIFIED,
    VERIFIED,
    NOT_VERIFIED,
    NO_ACTIVE_ACCOUNT
}

export type AccountResponseType = 
    'ALREADY-VERIFIED' |
    'VERIFIED' | 
    'NOT-VERIFIED' | 
    'no_active_account'

export const AccountResponseMapStatusType:Record<AccountResponseType,AccountResponseStatus> = {
    'ALREADY-VERIFIED':AccountResponseStatus.ALREADY_VERIFIED,
    'VERIFIED':AccountResponseStatus.VERIFIED,
    'NOT-VERIFIED':AccountResponseStatus.NOT_VERIFIED,
    'no_active_account':AccountResponseStatus.NO_ACTIVE_ACCOUNT

}