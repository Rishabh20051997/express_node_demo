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

export const getAllEmployees = async (req, res) => {
    const employees = await getAllEmployeesList()
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

export const createNewEmployee = async (req, res) => {
    const firstName = req?.body?.firstname
    const lastName = req?.body?.lastname

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
            message: err
        })
    }
}

export const updateEmployee = async (req, res) => {
    const id = req?.body?.id
    const firstName = req.body?.firstname
    const lastName = req.body?.lastname

    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)

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

export const deleteEmployee = async (req, res) => {
    const id = req?.body?.id
    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)


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

export const getEmployee = async (req, res) => {
    const id = req?.body?.id
    if (!id) {
        return sendBadRequestResponse(res, {
            message: EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        })
    }

    const employee = await findEmployeeById(id)

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