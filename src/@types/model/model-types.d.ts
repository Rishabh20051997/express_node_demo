type IEmployeeModelDocType = import('mongoose').HydratedDocument<IEmployeeSchema>
type IUserModelDocType = import('mongoose').HydratedDocument<IUserSchema>
type ITaskModelDocType = import('mongoose').HydratedDocument<ITaskSchema>

type EmployeeModalSchema = import('@model/employee-model').EmployeeModalSchema

type TaskModalSchema = import('@model/task-model').TaskModalSchema
type UserModalSchema = import('@model/user-model').UserModalSchema

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