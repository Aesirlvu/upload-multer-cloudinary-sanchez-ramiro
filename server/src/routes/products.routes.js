import { Router } from "express";

import {
  UploadSingleProduct,
  GetProducts,
} from "../controllers/products.controller.js";

const router = Router();

router.post("/upload", UploadSingleProduct);
router.get("/products", GetProducts);

export default router;
