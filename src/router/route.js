const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")
const cardController=require("../controller/cardController")

//Customer API=>

router.post("/CreateCustomer",customerController.createCustomer)
router.get("/getCustomer",customerController.getCustomer)
router.delete("/deleteCustomer/:customerId",customerController.deleteCustomer)

//Card API=>

router.post("/createCard",cardController.createCard)
router.get("/getCard",cardController.getCard)

module.exports=router







