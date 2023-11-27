import { coupons } from './models/coupon.model';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router'
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
import categoryRouter from './routers/category.router';
import couponRouter from './routers/coupon.router';
dbConnect();

export const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

app.use("/api/foods", foodRouter);
app.use("/api/coupons", couponRouter)
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
