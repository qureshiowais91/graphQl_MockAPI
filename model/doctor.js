import mongoose from "mongoose";
const schema = mongoose.Schema;



const doctorSchema  =  new schema({
    name:String,
    mobile:String,
    password:String
})

const doctor = mongoose.model('doctor',doctorSchema);

export default doctor;