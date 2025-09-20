import { Router } from "express";
import {
  createSweet, listSweets, searchSweets, updateSweet,
  deleteSweet, purchaseSweet, restockSweet
} from "../controllers/sweetsController";
import { protect, adminOnly } from "../middlewares/auth";

const router = Router();

router.get("/", listSweets);
router.get("/search", searchSweets);


router.post("/", protect, createSweet);
router.put("/:id", protect,adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
