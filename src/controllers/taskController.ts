import Task from '../model/Task'

export const getAllTasks = async (_req, res) => {
    const taskList = await Task.find();
    if (!taskList) return res.status(204).json({ status: 200, message: 'No users found', data: [] });

    res.status(200).json({ status: 200, message: 'Success', data: taskList });
}



export const createNewTask = async (req, res) => {
    if (!req?.body?.task) {
        return res.status(400).json({ status: 400, message: 'Task is required' });
    }

    try {
        const result = await Task.create({
            task: req.body.task,
        });

        res.status(201).json({ status: 201, message: 'Success', data:  result  });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ status: 400 , message: 'Something went wrong', error: err });
    }
}