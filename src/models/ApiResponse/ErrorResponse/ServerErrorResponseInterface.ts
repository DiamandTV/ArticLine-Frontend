type ServerErrorType = 'validation_error' | 'client_error' | 'server_error'

export interface ServerErrorResponseInterface{
    code:string,
    detail:string,
    attr:string
}

export interface ServerErrorsAndTypeInterface{
    errors:Array<ServerErrorResponseInterface>
    type:ServerErrorType
}