const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId : { type: String, required: true, unique: true },
    value : { type: Number, required: true},
    creationDate : { type: Date, required: true},
    items :[{
        productId : { type: Number, required: true},
        quantity: { type: Number, required: true},
        price: { type: Number, required: true}
    }]
});

module.exports = mongoose.model('Order', orderSchema);