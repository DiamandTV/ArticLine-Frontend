export enum PermissionResponseStatus{
    PERMISSION_DENIED
}

export type PermissionResponseType = 'permission_denied'

export const PermissionResponseMapStatusType:Record<PermissionResponseType,PermissionResponseStatus> = {
    'permission_denied':PermissionResponseStatus.PERMISSION_DENIED
}