import mongoose from "mongoose";
const schema = mongoose.Schema;



const patient  =  new schema({
    name:String,
    mobile:String,
    password:String
})


module.exports =mongoose.model('Patient',patient);