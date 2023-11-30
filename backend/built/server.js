"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
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
var urls_1 = require("./share/urls");
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
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
exports.corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        // if (!origin && env.BUILD_MODE === "dev") {
        //   return callback(null, true);
        // }
        if (urls_1.WHITELIST_DOMAINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(exports.corsOptions));
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
