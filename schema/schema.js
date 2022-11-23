// const graphql = require("graphql");
import graphql from "graphql"
import patient from "../model/patient.js"
import doctor from "../model/doctor.js"

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const PatientType = new GraphQLObjectType({
    name: "Patient",
    fields: () => ({
        id: { type: GraphQLID },
        mobile: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        doctor: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                console.log(parent)
                return patient.find({doctor:parent.id})
            }
        },
    })
})

const DoctorType = new GraphQLObjectType({
    name: "Doctor",
    fields: () => ({
        id: { type: GraphQLID },
        mobile: { type: GraphQLString },
        password: { type: GraphQLString },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                console.log(parent)
                // return _.filter(patients, { doctorId: parent.id })
                return doctor.find({patient:parent.id})

            }
        },
        patient: {
            type: PatientType,
            resolve(parent, args) {
                console.log(parent)
                return patient.findById(parent.patient_id)
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addPatient: {
            type: PatientType,
            args: {
                mobile: { type: GraphQLString },
                password: { type: GraphQLString },
                doctorId:{type:GraphQLID}
            },
            resolve(parent, args) {
                let newpatient = new patient({
                    mobile: args.mobile,
                    password: args.password,
                    doctorId:args.doctorId
                })
                return newpatient.save();
            }
        },
        addDoctor: {
            type: DoctorType,
            args: {
                mobile: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                let newDoctor = new doctor({
                    mobile: args.mobile,
                    password: args.password
                })
                return newDoctor.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        patient: {
            type: PatientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(patients, { id: args.id })
                return patient.findById(args.id);
            }
        },
        doctor: {
            type: DoctorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(doctor, { id: args.id })
                return doctor.findById(args.id)
            }
        },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                return patient.find({})
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                return doctor.find({})
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export default schema;