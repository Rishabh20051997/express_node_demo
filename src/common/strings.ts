const AUTHORIZATION_STRINGS = {
    INCORRECT_CREDENTIALS: 'User Name or Password is incorrect' ,
    INVALID_PARAMS : 'Username and password are required.',
    ALREADY_EXISTS: 'User Already Exists. Please Login to continue'
}

const LOGOUT_STRINGS = {
    TOKEN_MISSING : 'Token Missing',
    NO_USER_FOUND: 'Log out'
}


const USER_LIST_RESPONSE_LABEL = {
    NO_USER: 'No users found',
    ID_REQUIRED: 'User ID required',
    USER_NOT_FOUND: `User not found`
}

const TASK_LIST_RESPONSE_LABEL = {
    NO_TASK: 'No task found',
    TASK_REQUIRED: 'Task is required'
}

const EMPLOYEE_LIST_RESPONSE_LABEL = {
    NO_EMPLOYEES: 'No employees found.',
    PARAMS_REQUIRED: 'First and last names are required',
    ID_MISSING: 'ID parameter is required.',
    NO_EMPLOYEE_FOUND: 'No employee Found'
}

const SUCCESS_RESPONSE_MESSAGE = 'Success'
const SOMETHING_WENT_WRONG_MESSAGE = 'Something Went Wrong'
const CORS_ERROR_MESSAGE = 'Not allowed by CORS'
const ACCESS_MISSING = 'Access Missing'

export {
    SUCCESS_RESPONSE_MESSAGE,
    USER_LIST_RESPONSE_LABEL,
    AUTHORIZATION_STRINGS,
    CORS_ERROR_MESSAGE,
    LOGOUT_STRINGS,
    SOMETHING_WENT_WRONG_MESSAGE,
    TASK_LIST_RESPONSE_LABEL,
    EMPLOYEE_LIST_RESPONSE_LABEL,
    ACCESS_MISSING
}