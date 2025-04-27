import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: String, required: true }],
    description: { type: String },
    avatarUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Group', GroupSchema);
