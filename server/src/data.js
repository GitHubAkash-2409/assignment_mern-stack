// In-memory store for development
const products = [
  {
    _id: '1',
    title: 'Gaming Mouse',
    description: 'High precision gaming mouse with RGB lighting',
    price: 49.99,
    rating: 4.5,
    image: 'https://via.placeholder.com/300x300?text=Gaming+Mouse',
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Wireless Headphones',
    description: 'Noise cancelling wireless headphones with 30hr battery',
    price: 129.99,
    rating: 4.7,
    image: 'https://via.placeholder.com/300x300?text=Wireless+Headphones',
    createdAt: new Date()
  },
  {
    _id: '3',
    title: 'Smart Watch',
    description: 'Fitness tracking smart watch with heart rate monitor',
    price: 199.99,
    rating: 4.3,
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    createdAt: new Date()
  }
];

let nextId = 4;

module.exports = { products, nextId };
