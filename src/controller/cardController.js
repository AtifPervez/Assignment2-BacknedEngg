const cardModel = require("../model/cardModel")
const customerModel=require("../model/customerModel")
const createCard = async (req, res) => {
    try {
        let data = req.body
        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, message: "plz enter some data" })
        }
        let { cardNumber, cardType, customerName, Status, vision,customerId } = data
        if (!cardNumber) {
            return res.status(400).send({ status: false, message: "plz enter cardNumber" })
        }

        if (!['Regular', 'Special'].includes(cardType)) return res.status(400).send({ status: false, message: 'Enter valid status' })
        if (!customerName) {
            return res.status(400).send({ status: false, message: "plz enter customerName" })
        }
        if (/[^a-zA-Z]/.test(customerName)) {
            return res.status(400).send({ status: false, message: "plz enter customerName in alphabet" })
        }
        if (!vision) {
            return res.status(400).send({ status: false, message: "plz enter vision" })
        }
        let checkCustomer=await customerModel.findById({_id:customerId})
       
        if(!checkCustomer){
            return res.status(400).send({status:false,message:"plz enter customerId"})
        }
        let createdData = await cardModel.create(data)
        return res.status(201).send({ status: true, message: "card data is created", data: createdData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCard = async (req, res) => {
    try {
        let getCardInfo = await cardModel.find().populate( "customerId" )
        console.log(getCardInfo);
        if (getCardInfo.length == 0) {
            return res.status(400).send({ status: false, message: "plz enter some data" })
        }
        return res.status(200).send({ status: true, message: "customer card get successfully", data: getCardInfo })
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}








module.exports = { createCard, getCard }










