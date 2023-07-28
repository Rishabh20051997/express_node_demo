import Employee from "@model/employee-model";

const getAllEmployeesList = async (): Promise<IEmployeeModelDocType[]> => {
    const list = await Employee.find();
    return list || []
}

const createNewEmployeeEntry = async ({
    firstName,
    lastName
}: {
    firstName: string
    lastName: string   
}): Promise<IEmployeeModelDocType> => {
    const result: IEmployeeModelDocType  = await Employee.create({
        firstname: firstName,
        lastname: lastName
    })
    return result
}

const findEmployeeById = async (id: string): Promise<IEmployeeModelDocType> => {
    return await Employee.findOne({ _id: id }).exec();
}

const updateEmployeeData = async (employeeInstance: IEmployeeModelDocType, {
    firstName = '',
    lastName = ''
}): Promise<IEmployeeModelDocType> => {
    if (firstName) {
        employeeInstance.firstname = lastName
    }
    if (lastName) {
        employeeInstance.lastname = lastName
    }
    return await employeeInstance.save();
}

const deleteEmployeeEntry = async (employeeInstance: IEmployeeModelDocType): Promise<IEmployeeModelDocType> => {
    return await employeeInstance.deleteOne();
}

export {
    findEmployeeById,
    updateEmployeeData,
    getAllEmployeesList,
    createNewEmployeeEntry,
    deleteEmployeeEntry
}