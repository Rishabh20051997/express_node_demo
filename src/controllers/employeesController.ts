import { STATUS_CODE } from '../common/constant';
import Employee from '../model/Employee'
import { log } from '../service/loggerService';

export const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) {
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, message: 'No employees found.', data: [] });
    }

    res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, message: 'Success', data: employees });
}

export const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: 'First and last names are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(STATUS_CODE.CREATED).json({ status: STATUS_CODE.CREATED, message: 'Success', data:  result  });
    } catch (err) {
        console.error(err);
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST , message: 'Something went wrong', error: err });
    }
}

export const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, "message": `No employee matches ID ${req.body.id}.` });
    }

    if (req.body?.firstname) {
        employee.firstname = req.body.firstname;
    }
    if (req.body?.lastname) {
        employee.lastname = req.body.lastname;
    }
    const result = await employee.save();

    return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, "message": `Success`, data: result });
}

export const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: 'Employee ID required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    log('employee :', employee)

    if (!employee) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    log('result :', result)
    return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, "message": `Success`, data: result });
}

export const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: 'Employee ID required.' });
    } 

    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, "message": `No employee matches ID ${req.params.id}.` });
    }

    return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, "message": `Success`, data: employee });
}