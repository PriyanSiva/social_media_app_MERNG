const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const{ MONGODB } = require('./config');

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'HelloWorld!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log("MongoDB connection established")
        return server.listen({ port: 5000})
    })
    .then(res => {
        console.log(`Server running on ${res.url}`)
    });