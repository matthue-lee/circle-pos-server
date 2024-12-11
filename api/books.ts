import path from 'path';
import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import swaggerDocument from '../src/docs/swagger.json';
import { getAllBooks, getUniqueBook, purchaseBook } from '../src/controller/booksController';
import catchAsyncErrors from '../src/utils/catchAsyncErrors';

const app = express();

// Serve Swagger UI statically
const swaggerUiPath = path.join(__dirname, '../node_modules/swagger-ui-dist');
app.use('/api-docs', express.static(swaggerUiPath));
app.get('/api-docs/swagger.json', (req, res) => {
    res.json(swaggerDocument);
});

// Define routes
app.get('/', catchAsyncErrors(getAllBooks));
app.get('/:id', catchAsyncErrors(getUniqueBook));
app.post('/:id/purchase', catchAsyncErrors(purchaseBook));

export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
