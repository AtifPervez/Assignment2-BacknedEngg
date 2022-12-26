const customerModel = require("../model/customerModel")
const uuid = require("uuid")
const { findOne } = require("../model/customerModel")
const jwt = require("jsonwebtoken")
const { objectid } = require("../../../../../ProjectsMine/Projects/Project5/project-5/src/validator/validator")
const { default: mongoose } = require("mongoose")


const createCustomer = async (req, res) => {
    try {
        let data = req.body
        let { firstName, lastName, mobileNumber, DOB, emailID, address, customerId, Status } = data
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
        if (!emailID) {
            return res.status(400).send({ status: false, message: "plz enter your emailID" })
        }
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailID)) {
            return res.status(400).send({ status: false, message: "Email should be valid" });
        }

        let checkEmail = await customerModel.findOne({ emailID: emailID })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: "emailID is already exists" })

        }

        if (!address) {
            return res.status(400).send({ status: false, message: "plz enter your address" });
        }
        // if(!customerId){
        //     return res.status(400).send({status:false,message:"plz enter customerId"})
        // }

        if (!Status) {
            return res.status(400).send({ status: false, message: "enter your status" });
        }
        if (!['Active', 'Inactive'].includes(Status)) return res.status(400).send({ status: false, message: 'Enter valid status' })
        let createData = await customerModel.create(data)
        res.status(201).send({ status: true, message: "Customer Created successfully", data: createData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }

}

// const login = async (req, res) => {
//     try {
//         let data = req.body
//         let { emailID, mobileNumber } = data

//         if (!Object.keys(data).length) {
//             return res.status(400).send({ status: false, message: "plz enter your data" })
//         }
//         if (!emailID) {
//             return res.status(400).send({ status: false, message: "plz enter your emailID" })
//         }
//         if (!mobileNumber) {
//             return res.status(400).send({ status: false, message: "plz enter your phone number" })
//         }

//         let checkEmail = await customerModel.findOne({ emailID: emailID })
//         if (!checkEmail) {
//             return res.status(400).send({ status: false, message: "emailID is incorrect" })
//         }
//         if (mobileNumber != checkEmail.mobileNumber) {
//             return res.status(400).send({ status: false, message: "mobileNumber is incorrect" })
//         }
//         let token = jwt.sign(
//             {
//                 customerID: checkEmail._id.toString(),
//                 iat: Math.floor(Date.now() / 100),
//                 exp: Math.floor(Date.now() / 100) + 24 * 60 * 60,
//             },
//             "password"
//         )
//         return res.status(200).send({ status: true, message: "customer login successfully", data: token })

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message })

//     }
// }

const getCustomer = async (req, res) => {
    try {
        let getDetailOfCustomer = await customerModel.findOne({ Status: "Active" })
        if (getDetailOfCustomer.length == 0) {
            return res.status(404).send({ status: false, message: "plz enter customer details" })
        }

        return res.status(200).send({ status: true, message: "customer get successfully", data: getDetailOfCustomer })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }


}

const deleteCustomer = async (req, res) => {
    try {

        let customerId = req.params.customerId
        // console.log(customerId);
        // if (!customerId) {
        //     return res.status(400).send({ status: false, message: "plz enter your customerID" })

        
        if (!mongoose.Types.ObjectId(customerId)) {

            return res.status(400).send({ status: false, message: "customerId not found" })
        }
        let customer = await customerModel.find({ _id: customerId, isDeleted: false })
        // console.log(customer);

        if (!customer) {
            return res.status(404).send({ status: false, message: "customerID not found" })
        }
        let deleteCustomer = await customerModel.findOneAndUpdate({ _id: customerId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date } }, { new: true }).select({ __v: 0 })
        console.log(deleteCustomer);
        return res.status(200).send({ status: true, message: "success", data: deleteCustomer })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = { createCustomer, getCustomer, deleteCustomer }






































































