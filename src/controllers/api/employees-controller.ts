import {
    EMPLOYEE_LIST_RESPONSE_LABEL,
    SUCCESS_RESPONSE_MESSAGE
} from '@common/strings';
import {
    createNewEmployeeEntry,
    deleteEmployeeEntry,
    findEmployeeById,
    getAllEmployeesList,
    updateEmployeeData
} from '@use-cases/employee-use-cases';
import {
    sendBadRequestResponse,
    sendNewItemCreatedRequestResponse,
    sendSuccessRequestForNoDataResponse,
    sendSuccessRequestResponse
} from '@services/response-transmitter';

/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all employees list
 */
export const getAllEmployees = async (_req: IRequest, res: IResponse) => {
    const employees = await getAllEmployeesList()

    // if employee list is empty
    if (!employees.length) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEES,
            data: []
        })
    }

    sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: employees
    })
}

/**
 * 
 * @param { firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns new employee created response
 */
export const createNewEmployee = async (req: IRequest, res: IResponse) => {
    const firstName: string | undefined = req?.body?.firstname
    const lastName: string | undefined = req?.body?.lastname

    // if params are not proper -> return
    if (!firstName || !lastName) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.PARAMS_REQUIRED
        })
    }

    try {
        const result = await createNewEmployeeEntry({
            firstName,
            lastName
        })

        sendNewItemCreatedRequestResponse(res, {
            message: SUCCESS_RESPONSE_MESSAGE,
            data: result
        })
    } catch (err) {
        return sendBadRequestResponse(res, {
            message: err?.toString()
        })
    }
}


/**
 * 
 * @param { id: string, firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns update the existing employee data using its id & sends back response
 */
export const updateEmployee = async (req: IRequest, res: IResponse) => {
    const id: string | undefined = req?.body?.id
    const firstName: string | undefined = req.body?.firstname
    const lastName: string | undefined = req.body?.lastname

    // if id param is not there
    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)

    // if employee doesn't exists
    if (!employee) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }

    const result = await updateEmployeeData(employee, {
        firstName,
        lastName
    })

    return sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: result
    })
}


/**
 * 
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing employee data using its id & sends back response
 */
export const deleteEmployee = async (req: IRequest, res: IResponse) => {
    const id: string | undefined = req?.body?.id

    // if id param is not there
    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)

    // if employee doesn't exists
    if (!employee) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }
    const result = await deleteEmployeeEntry(employee); //{ _id: req.body.id }

    return sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: result
    })
}


/**
 * 
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns finds the existing employee data using its id & sends back response
 */
export const getEmployee = async (req: IRequest, res: IResponse) => {
    const id: string | undefined = req?.body?.id

    // if id param is not there
    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)

    // if employee doesn't exists
    if (!employee) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }

    return sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: employee
    })
}