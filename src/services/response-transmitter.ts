import { ACCESS_MISSING } from "@common/strings";
import { STATUS_CODE } from "@constant";

const sendBadRequestResponse = (res: IResponse, {
    message = ''
}) => {
    res.status(STATUS_CODE.BAD_REQUEST).json({
        status: STATUS_CODE.BAD_REQUEST,
        message: message
    });
}

const sendConflictsRequestResponse = (res: IResponse, {
    message = ''
}) => {
    res.status(STATUS_CODE.CONFLICTS).json({
        status: STATUS_CODE.CONFLICTS,
        message: message
    });
}

const sendNewItemCreatedRequestResponse = (res: IResponse, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.CREATED).json({
        status: STATUS_CODE.CREATED,
        message: message,
        data
    });
}

const sendSuccessRequestResponse = (res: IResponse, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        status: STATUS_CODE.SUCCESS,
        message: message,
        data: data
    });
}

const sendSuccessRequestForNoDataResponse = (res: IResponse, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        status: STATUS_CODE.NO_CONTENT,
        message: message,
        data: data
    });
}

const sendServerErrorRequestResponse = (res: IResponse, {
    message = ''
}) => {
    res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS_CODE.SERVER_ERROR,
        message: message
    });
}

const sendAccessDeniedRequestResponse = (res: IResponse) => {
    res.status(STATUS_CODE.ACCESS_DENIED).json({
        status: STATUS_CODE.ACCESS_DENIED,
        message: ACCESS_MISSING
    });
}

const sendPlainResponseCode = (res: IResponse, {
    code
} : {
    code: number
}) => {
    res.sendStatus(code)
}

const sendLoginRequestResponse = (res: IResponse, {
    user,
    accessToken,
    refreshToken
}: {
    user: IUserResponseObject
    accessToken: string
    refreshToken:  string
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        user,
        accessToken,
        refreshToken
    });
}

const sendLogoutRequestResponse = (res: IResponse, {
    message
}) => {
    res.status(STATUS_CODE.LOGOUT).json({
        status: STATUS_CODE.LOGOUT, // session expire code
        message: message
    });
}



export {
    sendBadRequestResponse,
    sendConflictsRequestResponse,
    sendLoginRequestResponse,
    sendLogoutRequestResponse,
    sendPlainResponseCode,
    sendNewItemCreatedRequestResponse,
    sendServerErrorRequestResponse,
    sendSuccessRequestResponse,
    sendSuccessRequestForNoDataResponse,
    sendAccessDeniedRequestResponse
}





// import { STATUS_CODE } from "@constant";

const sendResponseTemplate = (primaryCode: number, secondaryCode = primaryCode ) => (res: IResponse, {
    message = '',
    data = ''
} : {
    message?:string,
    data?:any
}) => {
    res.status(primaryCode).json({
        status: secondaryCode,
        message: message,
        data: data
    });
    
}

// const sendPlainResponseCode = (res: IResponse, {
//     code
// } : {
//     code: number
// }) => {
//     res.sendStatus(code)
// }

// const sendLoginRequestResponse = (res: IResponse, {
//     user,
//     accessToken,
//     refreshToken
// }: {
//     user: IUserResponseObject
//     accessToken: string
//     refreshToken:  string
// }) => {
//     res.status(STATUS_CODE.SUCCESS).json({
//         user,
//         accessToken,
//         refreshToken
//     });
// }


const sendResponse = {
    success: sendResponseTemplate(STATUS_CODE.SUCCESS),
    badRequest: sendResponseTemplate(STATUS_CODE.BAD_REQUEST),
    conflictRequest: sendResponseTemplate(STATUS_CODE.CONFLICTS),
    createdRequest: sendResponseTemplate(STATUS_CODE.CREATED),
    serverError: sendResponseTemplate(STATUS_CODE.SERVER_ERROR),
    accessDenied: sendResponseTemplate(STATUS_CODE.ACCESS_DENIED),
    logOut: sendResponseTemplate(STATUS_CODE.LOGOUT),
    plainCode: sendPlainResponseCode,
}


export {
    // sendLoginRequestResponse,
    sendResponse
}