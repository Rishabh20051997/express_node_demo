import Task from "@model/task-model";

const getAllTasksList = async () => {
    const list = await Task.find();
    return list || []
}

const createNewTaskEntry = async (task) => {
    const result = await Task.create({
        task
    })
    return result
}

export {
    createNewTaskEntry,
    getAllTasksList
}