const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  unit: String,
  description: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Product', ProductSchema);
