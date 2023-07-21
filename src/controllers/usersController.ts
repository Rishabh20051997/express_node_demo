import { STATUS_CODE } from '../common/constant';
import User from '../model/User'

export const getAllUsers = async (_req, res) => {
    const users = await User.find();
    if (!users) return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, message: 'No users found', data: [] });

    res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, message: 'Success', data: users });
}

export const deleteUser = async (req, res) => {
    if (!req?.body?.id) {
        
    }

    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) {
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, message: `User ID ${req.body.id} not found` });
    }

    await user.deleteOne({ _id: req.body.id });
    res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, message: `Success` });

}

export const getUser = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, "message": 'User ID required' });
    } 

    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.NO_CONTENT, message: `User ID ${req.body.id} not found` });
    }

    res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, message: `Success`, data: { user } });
}