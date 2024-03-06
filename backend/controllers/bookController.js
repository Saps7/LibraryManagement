import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import Circulation from '../models/circulationModel.js';
import Member from '../models/memberModel.js';

const getAllBooks = asyncHandler( async(req, res) => {
    const books = await Book.find({});
    if(books){
        res.status(200).json(books);
    }
    else{
        res.status(404)
        throw new Error("No Book Found");
    }
})

const checkoutBook = asyncHandler( async(req, res) => {
    const { bookID } = req.params;
    const { memberID } = req.body;

    const book = await Book.findById(bookID);
    
    if(!book){
        res.status(404)
        throw new Error("Book not Found");
    }


    if(book.NumberOfCopies <= 0){
        res.status(400)
        throw new Error("No available copies for checkout");
    }

    const member = await Member.findById(memberID);
    if(!memeber){
        res.status(404)
        throw new Error("Member does not exist");
    }

    book.NumberOfCopies -= 1;
    await book.save();

    await Circulation.create({
        eventtype: 'checkout',
        book_id: bookID,
        member_id: memberID
    });

    res.status(200).json({message: 'Book checked out successfully'})
})

const returnBook = asyncHandler( async(req, res) => {
    const { bookID } = req.params;
    const { memberID } = req.body;

    const book = await Book.findById(bookID);
    
    if(!book){
        res.status(404)
        throw new Error("Book not Found");
    }

    const previousCheckout = await circulationModel.findOne({
        eventtype: 'checkout',
        book_id: bookID,
        member_id: memberID
    })

    if(!previousCheckout){
        res.status(400)
        throw new Error("This book was not checked out by this member");
    }

    book.NumberOfCopies += 1;
    await book.save();

    await Circulation.create({
        eventtype: 'return',
        book_id: bookID,
        member_id: memberID
    });

    res.status(200).json({message: 'Book checked out successfully'})
})

export { getAllBooks, checkoutBook, returnBook };