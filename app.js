// const express = require('express')
import express from "express";
import { graphqlHTTP } from "express-graphql"
import { mongoose } from "mongoose";
import schema from "./schema/schema.js";

const app = express()
const port = 3000

mongoose.connect("mongodb+srv://owais91:vZk91AcgWiZqyZpz@cluster0.p4ejrtj.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log("ok")
})
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})