const express=require("express")
const bodyParser=require("body-parser")
const router=require("./router/route")
const mongoose= require("mongoose")
const app=express()
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://atifpervez:34BmDa5XVvtznQvO@code.8mvlc.mongodb.net/assignment2_backEndEngg")
.then(()=>{
    console.log("MongoDb is connected succesfull");
})
.catch(err=>console.log(err.message));


app.use("/", router)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

