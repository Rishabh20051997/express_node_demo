// possible user type of user
export enum USER_TYPES {
    USER =  'User',
    EDITOR = 'Editor',
    ADMIN = 'Admin'
} 

// time taken by access token to expire
export const TOKEN_EXPIRE_TIME = '2m'

// time taken by refresh token to expire
export const REFRESH_TOKEN_EXPIRE_TIME = '1d'

export enum STATUS_CODE {
    // success
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,

    // client error
    BAD_REQUEST = 400,
    UN_AUTHORIZED = 401,
    ACCESS_DENIED = 403,
    NOT_FOUND = 404,
    CONFLICTS = 409,
    LOGOUT = 440,

    // server error
    SERVER_ERROR = 500
}