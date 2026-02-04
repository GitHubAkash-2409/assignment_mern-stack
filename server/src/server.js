const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

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
