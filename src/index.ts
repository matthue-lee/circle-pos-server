import express from "express";
import booksRouter from "./router/booksRouter";
import { errorHandler } from "./middleware/errorHandler";
import ErrorHandler from "./utils/ErrorHandler";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/books", booksRouter);

// Handle undefined routes
app.use((_req, _res, next) => {
  next(new ErrorHandler("Route not found", 404));
});

// Error handler middleware
app.use(errorHandler);

// Export the app for Vercel
export default app;
