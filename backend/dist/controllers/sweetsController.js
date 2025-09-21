"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = exports.deleteSweet = exports.searchSweets = exports.listSweets = exports.updateSweet = exports.createSweet = void 0;
const Sweet_1 = __importDefault(require("../models/Sweet"));
const createSweet = async (req, res) => {
    const { name, category, price, quantity, description } = req.body;
    const imageUrl = req.file?.path;
    const sweet = await Sweet_1.default.create({
        name, category, price, quantity, description, imageUrl, createdBy: req.user._id
    });
    res.status(201).json(sweet);
};
exports.createSweet = createSweet;
const updateSweet = async (req, res) => {
    const id = req.params.id;
    const updateData = { ...req.body };
    if (req.file)
        updateData.imageUrl = req.file.path;
    const sweet = await Sweet_1.default.findByIdAndUpdate(id, updateData, { new: true });
    if (!sweet)
        return res.status(404).json({ message: "Not found" });
    res.json(sweet);
};
exports.updateSweet = updateSweet;
const listSweets = async (req, res) => {
    const sweets = await Sweet_1.default.find().sort({ createdAt: -1 });
    res.json(sweets);
};
exports.listSweets = listSweets;
const searchSweets = async (req, res) => {
    const { q, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (q)
        filter.name = { $regex: q, $options: "i" };
    if (category)
        filter.category = category;
    if (minPrice)
        filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
    if (maxPrice)
        filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
    const results = await Sweet_1.default.find(filter);
    res.json(results);
};
exports.searchSweets = searchSweets;
const deleteSweet = async (req, res) => {
    const id = req.params.id;
    const sweet = await Sweet_1.default.findByIdAndDelete(id);
    if (!sweet)
        return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
};
exports.deleteSweet = deleteSweet;
const purchaseSweet = async (req, res) => {
    const id = req.params.id;
    const qty = Number(req.body.qty || 1);
    const sweet = await Sweet_1.default.findById(id);
    if (!sweet)
        return res.status(404).json({ message: "Not found" });
    if (sweet.quantity < qty)
        return res.status(400).json({ message: "Insufficient stock" });
    sweet.quantity -= qty;
    await sweet.save();
    res.json(sweet);
};
exports.purchaseSweet = purchaseSweet;
const restockSweet = async (req, res) => {
    const id = req.params.id;
    const add = Number(req.body.qty || 1);
    const sweet = await Sweet_1.default.findById(id);
    if (!sweet)
        return res.status(404).json({ message: "Not found" });
    sweet.quantity += add;
    await sweet.save();
    res.json(sweet);
};
exports.restockSweet = restockSweet;
