type IEmployeeModelDocType = import('mongoose').HydratedDocument<IEmployeeSchema>
type IUserModelDocType = import('mongoose').HydratedDocument<IUserSchema>
type ITaskModelDocType = import('mongoose').HydratedDocument<ITaskSchema>
type TypeObjectId = import('mongoose').Types.ObjectId


interface IEmployeeSchema {
    firstname: string
    lastname: string
}

interface ITaskSchema {
    task: string
}

interface IUserSchema {
    username: string
    roles: IUserTypes,
    password: string
    refreshToken: string
}