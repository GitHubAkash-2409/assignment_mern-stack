const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// If MONGO_URL is set, attempt to connect to MongoDB — controllers will use DB when connected
const MONGO_URL = process.env.MONGO_URL;
if (MONGO_URL) {
  const mongoose = require('mongoose');
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.warn('MongoDB connection failed, falling back to in-memory store', err));

  // require model file so it's registered with mongoose
  try {
    require('./models/ProductModel');
  } catch (e) {
    // ignore
  }

}

// Routes
app.use('/api/products', productsRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Products API' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
