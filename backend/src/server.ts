import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors, { CorsOptions } from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import orderRouter from "./routers/order.router";
import categoryRouter from "./routers/category.router";
import couponRouter from "./routers/coupon.router";
dotenv.config();
dbConnect();

const app = express();

app.use(cors({
    credentials:true,
    origin:["https://shopping-food.onrender.com","http://localhost:4200","http://localhost:5000,apiBaseUrl"]
}));
app.use(express.json());

app.use("/api/foods", foodRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${port}`;
app.listen(port, () => {
  console.log(`Website served on ${apiBaseUrl}`);
});
