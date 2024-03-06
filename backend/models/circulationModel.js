import mongoose from 'mongoose';

const circulationSchema = mongoose.Schema(
    {
        eventtype: {
            type: String,
            enum: ["checkout", "return"],
            required: true
        },
        member_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member'
        },
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        date: {
            type: Date,
            default: new Date('2021-05-31')
        }
    }
);

const Circulation = mongoose.model('Circulation', circulationSchema);

export default Circulation;