import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {
    getAllBooks,
    getUniqueBook,
    purchaseBook,
} from '../controller/booksController';
import catchAsyncErrors from '../utils/catchAsyncErrors';
import swaggerDocument from '../docs/swagger.json';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/', catchAsyncErrors(getAllBooks));
app.get('/:id', catchAsyncErrors(getUniqueBook));
app.post('/:id/purchase', catchAsyncErrors(purchaseBook));

// Vercel's handler
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
