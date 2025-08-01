const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  total: Number,
  status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
});
module.exports = mongoose.model('Order', OrderSchema);
