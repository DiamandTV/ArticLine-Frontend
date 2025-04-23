export enum PasswordResetRequestResponseStatus{
    RECENT_RESET_REQUEST,
    ERROR 
}

export type PasswordResetRequestResponseType = 
    'RECENT-REQUEST' |
    // 'TOKEN-EXPIRED' |
    // 'TOKEN-INVALID' |
    // 'LINK-EXPIRED' |
    'ERROR-EMAIL-SEND'

export const PasswordResetRequestResponseMapStatusType:Record<PasswordResetRequestResponseType,PasswordResetRequestResponseStatus> = {
    'RECENT-REQUEST':PasswordResetRequestResponseStatus.RECENT_RESET_REQUEST,
    'ERROR-EMAIL-SEND':PasswordResetRequestResponseStatus.ERROR
}


// 'RECENT-REQUEST' |
//     'TOKEN-EXPIRED' |
//     'TOKEN-INVALID' |
//     'LINK-EXPIRED' |
//     'ERROR-EMAIL-SEND'
