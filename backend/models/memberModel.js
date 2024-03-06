import mongoose from 'mongoose';

const memberSchema = mongoose.Schema(
    {
        MemberID: {
            type: Number,
            required: true,
            unique: true,
            default: () => Math.round(Math.random() * 10000) + 1
        },
        MemberName: {
            type: String,
            required: true,
        }
    }
);

memberSchema.index({ MemberID: 1 });

const Member = mongoose.model('Member', memberSchema);

export default Member;