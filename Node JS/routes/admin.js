const path = require("path");
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { body, check } = require("express-validator");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Please enter a title with minimum 5 characters")
      .isLength({
        min: 5,
      })
      .isString()
      .trim(),
    check("price", "Enter a valid price.").isFloat(),
    check("description", "Description should be minimum 5 characters.")
      .isLength({ min: 8, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Please enter a title with minimum 5 characters")
      .isLength({
        min: 5,
      })
      .isString()
      .trim(),
    check("price", "Enter a valid price.").isFloat(),
    check("description", "Description should be minimum 5 characters.")
      .isLength({ min: 8, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
