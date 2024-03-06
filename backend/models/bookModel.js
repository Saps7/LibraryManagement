import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        BookID: {
            type: Number,
            required: true,
            unique: true,
            default: () => Math.floor(Math.random() * 10000) + 1
        },
        BookName: {
            type: String,
            required: true
        },
        NumberOfCopies: {
            type: Number,
            required: true
        }
    }
);

bookSchema.index({ BookID: 1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;