import {
    EMPLOYEE_LIST_RESPONSE_LABEL,
    SUCCESS_RESPONSE_MESSAGE
} from '@common/strings';
import {
    createEmployee,
    deleteEmployee,
    getEmployeeById,
    getEmployeesList,
    updateEmployee
} from '@use-cases/employee-use-cases';
import { sendResponse } from '@services/response-transmitter';
import Employee from "@model/employee-model";

/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all employees list
 */
export const employeeListController = async (_req: IRequest, res: IResponse) => {
    const employees = await getEmployeesList(Employee)


    sendResponse.success(res, {
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
export const createEmployeeController = async (req: IRequest, res: IResponse) => {
    const firstName: string = req?.body?.firstname
    const lastName: string = req?.body?.lastname

    try {
        const result = await createEmployee(Employee, {
            firstName,
            lastName
        })
        sendResponse.createdRequest(res, {
            message: SUCCESS_RESPONSE_MESSAGE,
            data: result
        })

    } catch (err) {
        return sendResponse.serverError(res, {
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
export const updateEmployeeController = async (req: IRequest, res: IResponse) => {
    const id: string  = req?.params?.id
    const firstName: string  = req.body?.firstname
    const lastName: string  = req.body?.lastname

    const employee = await getEmployeeById(Employee, { id })

    // if employee doesn't exists
    if (!employee) {
        return sendResponse.badRequest(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }

    const result = await updateEmployee(employee, {
        firstName,
        lastName
    })

    return sendResponse.success(res, {
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
export const deleteEmployeeController = async (req: IRequest, res: IResponse) => {
    const id: string = req?.params?.id

    const employee = await getEmployeeById(Employee, { id } )

    // if employee doesn't exists
    if (!employee) {
        return sendResponse.badRequest(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }
    const result = await deleteEmployee(employee); //{ _id: req.body.id }

    return sendResponse.success(res, {
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
export const getEmployeeController = async (req: IRequest, res: IResponse) => {
    const id: string = req?.params?.id

    const employee = await getEmployeeById(Employee, { id })

    // if employee doesn't exists
    if (!employee) {
        return sendResponse.badRequest(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        })
    }

    return sendResponse.success(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: employee
    })
}