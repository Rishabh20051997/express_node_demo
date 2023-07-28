interface IJwtAccessTokenSignInObject {
    UserInfo : {
        username: string
        roles: string[]
    }
}

interface IJwtRefreshTokenSignInObject {
    username :string
}