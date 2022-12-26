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
        required: true,
        trim: true,
        unique: true
    },
    DOB: {
        type: Date,//YYYY/MM/DD
        trim: true
        
    },
    emailID: {
        type: String,
        lowerCase:true,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    customerId:{
        type:String,
        trim:true
      
    },
    Status:{
        type:String,
        required:true,
        trim:true
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }

},
    { timestamps: true }
)
module.exports = mongoose.model("customer", customerSchema)









