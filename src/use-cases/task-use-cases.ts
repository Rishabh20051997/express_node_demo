
import Task from "@model/task-model";

const getAllTasksList = async (): Promise<ITaskModelDocType[]> => {
    const list = await Task.find();
    return list || []
}

const createNewTaskEntry = async (task: string): Promise<ITaskModelDocType> => {
    const result = await Task.create({
        task
    })
    return result
}

export {
    createNewTaskEntry,
    getAllTasksList
}