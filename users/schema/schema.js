/*
Schema has all the knowledge that lets GraphQL know what your application's data looks like, including what properties each object has and how they're related to each other
Root Query - allows us to jump into our graph to get data; entry point to our data
*/

const graphql = require('graphql');
const _ = require('lodash'); // Helper library that allows us to walk through collections of data
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'Samantha', age: 21 }
];

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: {
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt }
        }
    }
);

const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields: {
            user: { 
                type: UserType,
                args: { id: { type: GraphQLString } },
                resolve(parentValue, args) {
                    return _.find(users, { id: args.id });
                }
            }
        }
    }
);
// Resolve function purpose is actually going into the data and getting that information
// The code/query that we write in GraphiQL in the browser gets sent to the RootQuery. The query went and found the user key inside of its field's object. It finds the data and then return the response object.

module.exports = new GraphQLSchema(
    {
        query: RootQuery
    }
);