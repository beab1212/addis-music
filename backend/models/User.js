import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    // email, password, username,
    first_name: {
        type: String,
        maxlength: 20,
        default: 'Unknown',
    },
    last_name: {
        type: String,
        maxlength: 20,
        default: 'Unknown',
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide valid email'],
        minlength: 6,
    },
    username: {
        type: String,
        unique: true,
        minlength: 3,
    },
    profile_image: {
        type: String,
        maxlength:200,
        default: 'profile.png',
    },
    password: {
        type: String,
        minlength: 8,
    },
}, { timestamps: true });

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePass = async function(candidatePwd) {
    const isMatch = await bcrypt.compare(candidatePwd, this.password);
    return isMatch;
}

const User = mongoose.model('User', UserSchema);
export default User;
