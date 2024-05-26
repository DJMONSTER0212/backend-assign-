import { Router } from 'express';
import multer from 'multer';
import {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    uploadBooks
} from '../controllers/bookController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/books', authenticate, authorize(['USER', 'SELLER']), getBooks);
router.get('/books/:id', authenticate, authorize(['USER', 'SELLER']), getBook);
router.post('/books', authenticate, authorize(['SELLER']), createBook);
router.put('/books/:id', authenticate, authorize(['SELLER']), updateBook);
router.delete('/books/:id', authenticate, authorize(['SELLER']), deleteBook);
router.post('/books/upload', authenticate, authorize(['SELLER']), upload.single('file'), uploadBooks);

export default router;
