// Product factory function
const createProduct = (id, title, description, price, rating, image) => ({
  _id: String(id),
  title,
  description,
  price: parseFloat(price),
  rating: parseFloat(rating),
  image,
  createdAt: new Date()
});

module.exports = { createProduct };
