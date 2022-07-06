const express = require('express');
const { graphqlHTTP } = require('express-graphql'); // requiring the graphql library
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
// If there's an HTTP request for graphql, then this method will be used for the request
// Middleware function

app.listen(4000, () => {
    console.log("Listening to port 4000")
});