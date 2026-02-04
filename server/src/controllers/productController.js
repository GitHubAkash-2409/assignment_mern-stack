const { products } = require('../data');
const { createProduct } = require('../models/Product');
let nextId = 4;

// GET all products
const getAllProducts = (req, res) => {
  res.json(products);
};

// GET product by id
const getProductById = (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

// CREATE new product
const createProductHandler = (req, res) => {
  const { title, description, price, rating, image } = req.body;
  const newProduct = createProduct(nextId++, title, description, price, rating, image);
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE product
const updateProduct = (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  
  const { title, description, price, rating, image } = req.body;
  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price !== undefined ? parseFloat(price) : product.price;
  product.rating = rating !== undefined ? parseFloat(rating) : product.rating;
  product.image = image || product.image;
  
  res.json(product);
};

// DELETE product
const deleteProduct = (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProductHandler,
  updateProduct,
  deleteProduct
};
