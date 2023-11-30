"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var database_config_1 = require("./configs/database.config");
var order_router_1 = __importDefault(require("./routers/order.router"));
var category_router_1 = __importDefault(require("./routers/category.router"));
var coupon_router_1 = __importDefault(require("./routers/coupon.router"));
dotenv_1.default.config();
(0, database_config_1.dbConnect)();
// export const WHITELIST_DOMAINS = [
//   'http://localhost:4200/',
//   'https://shopping-food.onrender.com/'
// ];
// type CorsOriginCallback = (err: Error | null, allow?: boolean) => void;
// export const corsOptions: CorsOptions = {
//   origin: function (origin: string | undefined, callback: CorsOriginCallback) {
//     console.log(origin);
//     if (!origin || WHITELIST_DOMAINS.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
var app = (0, express_1.default)();
// app.use(cors({
//     credentials:true,
//     origin:["https://shopping-food.onrender.com"]
// }));
app.use(express_1.default.json());
app.use("/api/foods", food_router_1.default);
app.use("/api/coupons", coupon_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/categories", category_router_1.default);
app.use(express_1.default.static("public"));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Website served on http://localhost:" + port);
});
