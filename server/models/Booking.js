const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
   _id: String,
   user: { type: mongoose.Schema.Types.ObjectId, require: true },
   place: { type: String, required: true, ref: 'Place' },
   checkIn: { type: Date, require: true }, checkOut: { type: Date, require: true }, numberOfGuests: { type: Number, require: true }, fullName: { type: String, require: true }, price: { type: String, require: true },
})

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel; 