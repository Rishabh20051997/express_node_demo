import Employee from '../model/Employee'

export const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) {
        return res.status(204).json({ status: 200, message: 'No employees found.', data: [] });
    }

    res.status(200).json({ status: 200, message: 'Success', data: employees });
}

export const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ status: 400, message: 'First and last names are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json({ status: 201, message: 'Success', data:  result  });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ status: 400 , message: 'Something went wrong', error: err });
    }
}

export const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ status: 400, message: 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ status: 204, "message": `No employee matches ID ${req.body.id}.` });
    }

    if (req.body?.firstname) {
        employee.firstname = req.body.firstname;
    }
    if (req.body?.lastname) {
        employee.lastname = req.body.lastname;
    }
    const result = await employee.save();

    return res.status(201).json({ status: 201, "message": `Success`, data: result });
}

export const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ status: 400, message: 'Employee ID required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    console.log('employee :', employee)

    if (!employee) {
        return res.status(400).json({ status: 400, "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    console.log('result :', result)
    return res.status(200).json({ status: 200, "message": `Success`, data: result });
}

export const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ status: 400, message: 'Employee ID required.' });
    } 

    const employee = await Employee.findOne({ _id: req.params.id }).exec();

    if (!employee) {
        return res.status(204).json({ status: 204, "message": `No employee matches ID ${req.params.id}.` });
    }

    return res.status(200).json({ status: 200, "message": `Success`, data: employee });
}