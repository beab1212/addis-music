import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { signUser } from '../utils/jwt.js';
import CustomError from '../errors/index.js';
import User from '../models/User.js';


const UserController = {
    async me(req, res) {
        const user = req.user;

        const userData = await User.findById(user._id, { __v: 0, password: 0 });

        if (!userData) {
            throw new CustomError.BadRequest('Something went wrong');
        }

        const jsonUserData = userData._doc;
        
        return res.status(StatusCodes.OK).json({ success: true, user: { ...jsonUserData }});
    },

    async updateProfile(req, res) {
        const user = req.user;
        const { last_name, first_name, username } = req.body;

        const userData = await User.findById(user._id, { __v: 0 });

        if (!userData) {
            throw new CustomError.BadRequest('Something went wrong');
        }

        if (userData.last_name.toLowerCase() === last_name.toLowerCase() &&
            userData.first_name.toLowerCase() === first_name.toLowerCase() &&
            userData.username.toLowerCase() === username.toLowerCase() ) {
            throw new CustomError.BadRequest('Nothing is changed to save!');
        }

        await User.updateOne({ _id: new Types.ObjectId(user._id) }, { username: username, first_name: first_name, last_name: last_name });

        const updatedUserData = await User.findById(user._id, { __v: 0 });

        const currentUser = signUser(updatedUserData);

        return res.status(StatusCodes.OK).json({ success: true, message: 'profile detail updated successfully', user: currentUser } );
    }
}

export default UserController;
