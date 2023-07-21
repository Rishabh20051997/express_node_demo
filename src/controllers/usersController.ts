import User from '../model/User'

export const getAllUsers = async (_req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ status: 200, message: 'No users found', data: [] });

    res.status(200).json({ status: 200, message: 'Success', data: users });
}

export const deleteUser = async (req, res) => {
    if (!req?.body?.id) {
        
    }

    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) {
        return res.status(204).json({ status: 204, message: `User ID ${req.body.id} not found` });
    }

    await user.deleteOne({ _id: req.body.id });
    res.status(200).json({ status: 200, message: `Success` });

}

export const getUser = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ status: 400, "message": 'User ID required' });
    } 

    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
        return res.status(204).json({ status: 204, message: `User ID ${req.body.id} not found` });
    }

    res.status(200).json({ status: 200, message: `Success`, data: { user } });
}