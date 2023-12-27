"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var database_config_1 = require("./configs/database.config");
var order_router_1 = __importDefault(require("./routers/order.router"));
var category_router_1 = __importDefault(require("./routers/category.router"));
var coupon_router_1 = __importDefault(require("./routers/coupon.router"));
dotenv_1.default.config();
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://shopping-food.onrender.com/", "http://localhost:4200/"]
}));
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
