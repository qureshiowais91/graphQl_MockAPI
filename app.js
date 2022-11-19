const express = require('express')
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express()
const port = 3000

mongoose.connect("mongodb+srv://owais91:vZk91AcgWiZqyZpz@cluster0.btnyu.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open',()=>{
    console.log("ok")
})
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})