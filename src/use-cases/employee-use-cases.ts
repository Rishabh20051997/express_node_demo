const getEmployeesList = async (Employee : EmployeeModalSchema): Promise<IEmployeeModelDocType[]> => {
    const list = await Employee.find();
    return list || []
}

const createEmployee = async (Employee: EmployeeModalSchema, {
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

const getEmployeeById = async (Employee: EmployeeModalSchema, { id } :{ id: string } ): Promise<IEmployeeModelDocType> => {
    return await Employee.findOne({ _id: id }).exec();
}

const updateEmployee = async (employeeInstance: IEmployeeModelDocType, {
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

const deleteEmployee = async (employeeInstance: IEmployeeModelDocType): Promise<IEmployeeModelDocType> => {
    return await employeeInstance.deleteOne();
}

export {
    getEmployeeById,
    updateEmployee,
    getEmployeesList,
    createEmployee,
    deleteEmployee
}