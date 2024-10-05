import StatusCode from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errors/index.js';
import User from '../models/User.js';
import redisClient from '../db/redis.js';
import { setSessionCookie } from '../utils/cookie.js';

const AuthController = {
    async singup (req, res) {
        const { email, password, rePassword } = req.body;
        if (!email || !password || !rePassword) {
            throw new CustomError.BadRequest('Please provide sing up information properly');
        }

        if (!email.includes('@')) {
            throw new CustomError.BadRequest('Please enter valid email address');
        }

        if (password !== rePassword) {
            throw new CustomError.BadRequest('Password doesn\'t match');
        }

        if (password.length < 8) {
            throw new CustomError.BadRequest('Use strong password');
        }

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
            throw new CustomError.BadRequest('Email already registered');
        }

        // TODO: use more unique username instead email prefix
        const user = new User({
            email,
            username: email.split('@')[0],
            password
        });

        await user.save();

        const token = uuidv4();
        
        await redisClient.set(`auth_${token}`, JSON.stringify(user), 2592000);
        setSessionCookie(res, token);
        return res.status(StatusCode.CREATED).json({ success: true, message: 'account created successfully', data: { sessionToken: token } });
    },

    async singin (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new CustomError.BadRequest('Please provide sing up information properly');
        }

        if (!email.includes('@')) {
            throw new CustomError.BadRequest('Please enter valid email address');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new CustomError.UnauthenticatedError('Email doesn\'t exist');
        }

        const isPWDMatch = await user.comparePass(password);

        if(!isPWDMatch) {
            throw new CustomError.UnauthenticatedError('Invalid email or password');
        }

        const token = uuidv4();
        await redisClient.set(`auth_${token}`, JSON.stringify(user), 2592000);
        setSessionCookie(res, token);
        return res.status(StatusCode.OK).json({ success: true, message: 'signin successfully', data: { sessionToken: token } });
    },

    async signout (req, res) {
        const token = req.headers['session-token'] || null;
        const result = await redisClient.del(`auth_${token}`);
        return res.status(StatusCode.OK).json({ success: true, message: 'Signed out successfully' });
    }
};

export default AuthController;
