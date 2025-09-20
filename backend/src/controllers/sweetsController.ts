import { Request, Response } from "express";
import Sweet from "../models/Sweet";
import { AuthRequest } from "../middlewares/auth";
import mongoose from "mongoose";

export const createSweet = async (req: AuthRequest, res: Response) => {
  const { name, category, price, quantity, description } = req.body;
  if (!name || !category || price == null) return res.status(400).json({ message: "Missing fields" });

  const sweet = await Sweet.create({
    name, category, price, quantity: quantity || 0, description, createdBy: req.user._id
  });

  res.status(201).json(sweet);
};

export const listSweets = async (req: Request, res: Response) => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  res.json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const { q, category, minPrice, maxPrice } = req.query as any;
  const filter: any = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;
  if (minPrice) filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
  const results = await Sweet.find(filter);
  res.json(results);
};

export const updateSweet = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
  const sweet = await Sweet.findByIdAndUpdate(id, req.body, { new: true });
  if (!sweet) return res.status(404).json({ message: "Not found" });
  res.json(sweet);
};

export const deleteSweet = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const sweet = await Sweet.findByIdAndDelete(id);
  if (!sweet) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

export const purchaseSweet = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const qty = Number(req.body.qty || 1);
  const sweet = await Sweet.findById(id);
  if (!sweet) return res.status(404).json({ message: "Not found" });
  if (sweet.quantity < qty) return res.status(400).json({ message: "Insufficient stock" });
  sweet.quantity -= qty;
  await sweet.save();
  res.json(sweet);
};

export const restockSweet = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const add = Number(req.body.qty || 1);
  const sweet = await Sweet.findById(id);
  if (!sweet) return res.status(404).json({ message: "Not found" });
  sweet.quantity += add;
  await sweet.save();
  res.json(sweet);
};
