import Employee from "@model/employee-model";

const getAllEmployeesList = async () => {
    const list = await Employee.find();
    return list || []
}

const createNewEmployeeEntry = async ({
    firstName,
    lastName
}) => {
    const result = await Employee.create({
        firstname: firstName,
        lastname: lastName
    })
    return result
}

const findEmployeeById = async (id) => {
    return await Employee.findOne({ _id: id }).exec();
}

const updateEmployeeData = async (employeeInstance, {
    firstName,
    lastName
}) => {
    if (firstName) {
        employeeInstance.firstname = lastName
    }
    if (lastName) {
        employeeInstance.lastname = lastName
    }
    return await employeeInstance.save();
}

const deleteEmployeeEntry = async (employeeInstance) => {

    return await employeeInstance.deleteOne();
}

export {
    findEmployeeById,
    updateEmployeeData,
    getAllEmployeesList,
    createNewEmployeeEntry,
    deleteEmployeeEntry
}