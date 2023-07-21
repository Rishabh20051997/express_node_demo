export enum USER_TYPES {
    USER =  'User',
    EDITOR = 'Editor',
    ADMIN = 'Admin'
} 

export const TOKEN_EXPIRE_TIME = '2m'

export const REFRESH_TOKEN_EXPIRE_TIME = '1d'

export enum STATUS_CODE {
    SUCCESS = '200',
    CREATED = '201',
    NO_CONTENT = '204',

    BAD_REQUEST = '400',
    UN_AUTHORIZED = '401',
    ACCESS_DENIED = '403',
    CONFLICTS = '409',
    LOGOUT = '440',

    SERVER_ERROR = '500'
}