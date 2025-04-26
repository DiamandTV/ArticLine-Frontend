export enum AuthenticationResponseStatus {
    TOKEN_INVALID_OR_EXPIRED
}

export type AuthenticationResponseType = 'token_not_valid'

export const AuthenticationResponseStatusType:Record<AuthenticationResponseType,AuthenticationResponseStatus> = {
    'token_not_valid':AuthenticationResponseStatus.TOKEN_INVALID_OR_EXPIRED
}