import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Env } from './config/env.config';
import { asyncHandler } from './middleware/asyncHandler.middleware';
import { HTTPSTATUS } from './config/http.config';

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

app.get("/health", asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.ok).json({
        message: "Server is healthy",
        status: "OK",
    })
}));


app.listen(Env.PORT, () => {
    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})