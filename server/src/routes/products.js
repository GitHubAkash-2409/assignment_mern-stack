const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProductHandler,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProductHandler);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
