"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponModel = exports.FoodSchema = void 0;
var mongoose_1 = require("mongoose");
exports.FoodSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    discountCode: { type: String, required: true },
    discountPercent: { type: Number, required: true },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.couponModel = (0, mongoose_1.model)('discount', exports.FoodSchema);
