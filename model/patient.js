import { Schema, model } from "mongoose";

const schema = Schema;

const patientSchema = new schema({
    name: String,
    mobile: String,
    password: String
})

const patient = model('Patient', patientSchema);
export default patient 