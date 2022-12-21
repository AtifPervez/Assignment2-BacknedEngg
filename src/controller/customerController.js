const customerModel = require("../model/customerModel")
const uuid=require("uuid")
const { findOne } = require("../model/customerModel")



const createCustomer = async (req, res) => {
try {
    let data = req.body
    // let  dateOfBirth = new Date(req.dob)
    let { firstName, lastName, mobileNumber, dob, emailID, address, customerID, status } = data
    if (!Object.keys(data).length) {
        return res.status(400).send({ status: false, message: "plz enter some data" })
    }
    if (!firstName) {
        return res.status(400).send({ status: false, message: "plz enter fname" })
    }
    if ((/[^a-zA-Z]/.test(firstName))) {
        return res.status(400).send({ status: false, message: "do not enter number in the first name" })
    }
    if (!lastName) {
        return res.status(400).send({ status: false, message: "plz enter lname" })
    }
    if ((/[^a-zA-Z]/.test(lastName))) {
        return res.status(400).send({ status: false, message: "do not enter number in the last name" })
    }
    if (!mobileNumber) {
        return res.status(400).send({ status: false, message: "plz enter your mobile number" })
    }
    
    if (mobileNumber.length != 10) {
            return res.status(400).send({ status: false, message: "mobile number must be have only 10 digits" })
        }


    if ((/[^0-9]/.test(mobileNumber))) {
        return res.status(400).send({ status: false, message: "only digits are allowed in mobile number" })

    }
    if (!dob) {
        return res.status(400).send({ status: false, message: "plz enter your date of birth" })
    }
    // if ((/[/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$]/.test(DOB))) {
    //     return res.status(400).send({ status: false, message: "plz enter your DOB in correct format" })
    // }
    if(!emailID){
        return res.status(400).send({status: false, message: "plz enter your emailID"})
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailID)) {
        return res.status(400).send({ status: false, message: "Email should be valid" });
    }

     let checkEmail=await customerModel.findOne({emailID:emailID})
     if(checkEmail){
        return res.status(400).send({status:false,message:"emailID is already exists"})

     }

    if(!address){
        return res.status(400).send({ status: false, message: "plz enter your address" });
    }
    if(!customerID){
        return res.status(400).send({ status: false, message: "plz enter your customerID" });
    }
    if(!status){
        return res.status(400).send({ status: false, message: "enter your status" });
    }
    let createData=await customerModel.create(data)
    res.status(201).send({status:true,message:"customer Created successfully",data:createData})

    
} catch (error) {
    return res.status(500).send({status:false,error:message})
    
}


}
module.exports = {createCustomer} 









   









    




















