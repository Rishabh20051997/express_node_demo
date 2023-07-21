import { STATUS_CODE } from '../common/constant';
import Task from '../model/Task'

export const getAllTasks = async (_req, res) => {
    const taskList = await Task.find();
    if (!taskList) return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, message: 'No users found', data: [] });

    res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, message: 'Success', data: taskList });
}



export const createNewTask = async (req, res) => {
    if (!req?.body?.task) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: 'Task is required' });
    }

    try {
        const result = await Task.create({
            task: req.body.task,
        });

        res.status(STATUS_CODE.CREATED).json({ status: STATUS_CODE.CREATED, message: 'Success', data:  result  });
    } catch (err) {
        console.error(err);
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST , message: 'Something went wrong', error: err });
    }
}