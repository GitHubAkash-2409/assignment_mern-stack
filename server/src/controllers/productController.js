const { products } = require('../data');
const { createProduct } = require('../models/Product');
const mongoose = require('mongoose');
let ProductModel;
try {
  ProductModel = require('../models/ProductModel');
} catch (e) {
  ProductModel = null;
}

let nextId = 4;

const useDb = () => Boolean(ProductModel && mongoose.connection && mongoose.connection.readyState === 1);

// GET all products
const getAllProducts = async (req, res) => {
  if (useDb()) {
    try {
      const list = await ProductModel.find().sort({ createdAt: -1 });
      return res.json(list);
    } catch (err) {
      console.error('DB read error', err);
      return res.status(500).json({ error: 'DB read error' });
    }
  }
  res.json(products);
};

// GET product by id
const getProductById = async (req, res) => {
  if (useDb()) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.json(product);
    } catch (err) {
      console.error('DB get error', err);
      return res.status(500).json({ error: 'DB get error' });
    }
  }

  const product = products.find((p) => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

// CREATE new product
const createProductHandler = async (req, res) => {
  const { title, description, price, rating, image } = req.body;
  if (useDb()) {
    try {
      const created = await ProductModel.create({ title, description, price, rating, image });
      return res.status(201).json(created);
    } catch (err) {
      console.error('DB create error', err);
      return res.status(500).json({ error: 'DB create error' });
    }
  }

  const newProduct = createProduct(nextId++, title, description, price, rating, image);
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE product
const updateProduct = async (req, res) => {
  const { title, description, price, rating, image } = req.body;
  if (useDb()) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { title, description, price, rating, image },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Product not found' });
      return res.json(updated);
    } catch (err) {
      console.error('DB update error', err);
      return res.status(500).json({ error: 'DB update error' });
    }
  }

  const product = products.find((p) => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  
  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price !== undefined ? parseFloat(price) : product.price;
  product.rating = rating !== undefined ? parseFloat(rating) : product.rating;
  product.image = image || product.image;
  
  res.json(product);
};

// DELETE product
const deleteProduct = async (req, res) => {
  if (useDb()) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Product not found' });
      return res.json(deleted);
    } catch (err) {
      console.error('DB delete error', err);
      return res.status(500).json({ error: 'DB delete error' });
    }
  }

  const index = products.findIndex((p) => p._id === req.params.id);
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
