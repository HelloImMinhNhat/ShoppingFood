"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var database_config_1 = require("./configs/database.config");
var order_router_1 = __importDefault(require("./routers/order.router"));
var category_router_1 = __importDefault(require("./routers/category.router"));
var coupon_router_1 = __importDefault(require("./routers/coupon.router"));
(0, database_config_1.dbConnect)();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:4200']
}));
exports.app.use("/api/foods", food_router_1.default);
exports.app.use("/api/coupons", coupon_router_1.default);
exports.app.use("/api/users", user_router_1.default);
exports.app.use("/api/orders", order_router_1.default);
exports.app.use("/api/categories", category_router_1.default);
exports.app.use(express_1.default.static('doanweb'));
exports.app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'doanweb', 'index.html'));
});
var port = process.env.PORT || 5000;
exports.app.listen(port, function () {
    console.log("Website served on http://localhost:" + port);
});
