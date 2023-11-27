"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.CategorySchema = void 0;
var mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    CateID: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.CategoryModel = (0, mongoose_1.model)('category', exports.CategorySchema);
