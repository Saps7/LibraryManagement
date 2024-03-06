import express from 'express';
import { getAllBooks, checkoutBook, returnBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/checkout/:bookID', checkoutBook);
router.post('/return/:bookID', returnBook);

export default router;
