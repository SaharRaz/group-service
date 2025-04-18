import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }
        ],
        description: {
            type: String,
            trim: true,
            default: '',
        },
        avatarUrl: {
            type: String,
            trim: true,
            default: '',
        }
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

export default mongoose.model('Group', groupSchema);
