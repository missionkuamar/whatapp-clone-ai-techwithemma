import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Env } from './config/env.config';
import { asyncHandler } from './middleware/asyncHandler.middleware';
import { HTTPSTATUS } from './config/http.config';
import { errorHandler } from './middleware/errorHandler.middleware';
import connectDatabase from './config/database.config';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: Env.FRONTEND_ORIGIN,
        credentials: true,
    })
);

app.use(errorHandler);
app.get("/health", asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
        message: "Server is healthy",
        status: "OK",
    })
}));

 
app.listen(Env.PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})