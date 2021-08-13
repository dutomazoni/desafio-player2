import { model, Schema } from 'mongoose';

const user = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
);
const User = model('User', user, 'User');

export { User };
