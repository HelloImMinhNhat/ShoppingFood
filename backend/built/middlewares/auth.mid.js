"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_1 = require("../constants/http_status");
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    var jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined in the environment variables.");
        return res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
    try {
        var decodedUser = (0, jsonwebtoken_1.verify)(token, jwtSecret);
        req.user = decodedUser;
        return next();
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
});
