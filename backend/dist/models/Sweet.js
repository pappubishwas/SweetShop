"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SweetSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    description: { type: String },
    imageUrl: { type: String },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Sweet", SweetSchema);
