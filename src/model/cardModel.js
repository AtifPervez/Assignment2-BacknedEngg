const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true,
        trim: true

    },
    cardType: {
        type: String,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    Status: {
        type: String,
        default:"Active",
        trim: true
    },
       
    vision: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required: true,
        trim: true

    },

},
    { timestamps: true }
)
module.exports = mongoose.model("card", cardSchema)