const graphql = require("graphql");
const _ = require("lodash");
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
                return _.filter(doctor, { patient_id: parent.id })
            }
        },
    })
})

const DoctorType = new GraphQLObjectType({
    name: "Docctor",
    fields: () => ({
        id: { type: GraphQLID },
        mobile: { type: GraphQLString },
        password: { type: GraphQLString },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                console.log(parent)
                return _.filter(patients, { doctorId: parent.id })
            }
        },
        patient: {
            type: PatientType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(patients, { id: parent.patient_id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        patient: {
            type: PatientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(patients, { id: args.id })
            }
        },
        doctor: {
            type: DoctorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(doctor, { id: args.id })
            }
        },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                return patients
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                return doctor
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})