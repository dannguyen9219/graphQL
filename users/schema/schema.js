/*
Schema has all the knowledge that lets GraphQL know what your application's data looks like, including what properties each object has and how they're related to each other
Root Query - allows us to jump into our graph to get data; entry point to our data
*/

const graphql = require('graphql');
// const _ = require('lodash'); // Helper library that allows us to walk through collections of data; don't need lodash if using db.json because lodash is used for static data
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

// const users = [
//     { id: '23', firstName: 'Bill', age: 20 },
//     { id: '47', firstName: 'Samantha', age: 21 }
// ];

const CompanyType = new GraphQLObjectType(
    {
        name: "Company",
        fields: () => ({
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            users: {
                type: new GraphQLList(UserType),
                resolve(parentValue, args) {
                    return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data)
                }
            }
        })
    }
);

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            company: {
                type: CompanyType,
                resolve(parentValue, args) {
                    return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
                }
            }
        })
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
                    return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data); // This is making axios work nicely with GraphQL
                }
            },
            company: {
                type: CompanyType,
                args: { id: { type: GraphQLString } },
                resolve(parentValue, args) {
                    return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(resp => resp.data);
                }
            }
        }
    }
);
// Resolve function purpose is actually going into the data and getting that information
// The code/query that we write in GraphiQL in the browser gets sent to the RootQuery. The query went and found the user key inside of its field's object. It finds the data and then return the response object.

const mutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields: {
            addUser: {
                type: UserType,
                args: {
                    firstName: { type: new GraphQLNonNull(GraphQLString) },
                    age: { type: new GraphQLNonNull(GraphQLInt) },
                    companyId: { type: GraphQLString }
                },
                resolve(parentValue, { firstName, age} ) {
                    return axios.post('http://localhost:3000/users', { firstName, age })
                    .then(res => res.data);
                }
            },
            deleteUser: {
                type: UserType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(parentValue, { id } ) {
                    return axios.delete(`http://localhost:3000/users/${id}`, { id })
                    .then(res => res.data);
                }
            },
            editUser: {
                type: UserType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    firstName: { type: GraphQLString },
                    age: { type: GraphQLInt },
                    companyId: { type: GraphQLString }
                },
                resolve(parentValue, args) {
                    return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data);
                }
            }
        }
    }
);


module.exports = new GraphQLSchema(
    {
        query: RootQuery,
        mutation
    }
);