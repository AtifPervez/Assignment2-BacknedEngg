const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true

    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        // required: true,
        trim: true,
        unique: true
    },
    dob: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        trim: true
    },
    address:{
        type:String,
        // required:true,
        trim:true
    },
    customerID:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        
        // required:true,
        trim:true
    }

},
    { timestamps: true }
)
module.exports = mongoose.model("customer", customerSchema)









