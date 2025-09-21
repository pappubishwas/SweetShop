"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sweetsController_1 = require("../controllers/sweetsController");
const auth_1 = require("../middlewares/auth");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
router.get("/", sweetsController_1.listSweets);
router.get("/search", sweetsController_1.searchSweets);
router.post("/", auth_1.protect, auth_1.adminOnly, upload_1.default.single("image"), sweetsController_1.createSweet);
router.put("/:id", auth_1.protect, auth_1.adminOnly, upload_1.default.single("image"), sweetsController_1.updateSweet);
router.delete("/:id", auth_1.protect, auth_1.adminOnly, sweetsController_1.deleteSweet);
router.post("/:id/purchase", auth_1.protect, sweetsController_1.purchaseSweet);
router.post("/:id/restock", auth_1.protect, auth_1.adminOnly, sweetsController_1.restockSweet);
exports.default = router;
