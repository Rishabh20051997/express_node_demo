


const getTasksList = async (Task: TaskModalSchema): Promise<ITaskModelDocType[]> => {
    const list = await Task.find();
    return list || []
}

const createTask = async (Task: TaskModalSchema, {task} : { task: string }): Promise<ITaskModelDocType> => {
    const result = await Task.create({
        task
    })
    return result
}

export {
    createTask,
    getTasksList
}