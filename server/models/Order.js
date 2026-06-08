const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:     String,
      qty:      Number,
      price:    Number
    }
  ],
  totalPrice: { type: Number, required: true },
  status:     { type: String, default: 'pending' }  // pending, delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);