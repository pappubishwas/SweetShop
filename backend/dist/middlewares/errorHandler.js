"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
}
