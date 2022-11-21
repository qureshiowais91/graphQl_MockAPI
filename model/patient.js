import { Schema, model } from "mongoose";

const schema = Schema;

const patientSchema = new schema({
    mobile: String,
    password: String
})

const patient = model('Patient', patientSchema);
export default patient 