import dotenv from "dotenv";
dotenv.config();
import path, { dirname } from "path";
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import orderRouter from "./routers/order.router";
import categoryRouter from "./routers/category.router";
import couponRouter from "./routers/coupon.router";
import { WHITELIST_DOMAINS } from "./share/urls";
import { HTTP_BAD_REQUEST } from "./constants/http_status";
dbConnect();

const app = express();

// const options: cors.CorsOptions = {
//     allowedHeaders: [
//         "Origin",
//         "X-Requested-With",
//         "Content-Type",
//         "Accept",
//         "X-Access-Token",
//     ],
//     credentials: true,
//     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//     origin: "https://shopping-food.onrender.com/",
//     preflightContinue: false,
// };
// app.use(cors(options));
// app.options('*', cors(options));


export const corsOptions = {
  origin: function (origin:any, callback:any) {
    console.log(origin);
    
    // if (!origin && env.BUILD_MODE === "dev") {
    //   return callback(null, true);
    // }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'))
  },

  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
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
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
