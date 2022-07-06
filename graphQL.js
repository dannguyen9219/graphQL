/*
Why does GraphQL exist?
- Shortcomings on RESTful routes - URL schema becomes completed when we have nested relational data (we don't want to make multiple calls to the backend)
- When fetching heavily nested data, we can easily run into situations where we make too many HTTP calls
- We are vulnerable to overfetching data where we fetch an entire data when maybe we really want a small piece of it

What is GraphQL?
- A graph is a data structure that contains nodes and relations between each node (edges). Understanding how a graph structure is stored is key to GraphQL
- GraphQL is not a full application. It is just a discrete part of an application. An application may have many packages

How do we use GraphQL?
- We use queries to find data between the nodes in the graph

// Review of RESTful Routing //
- Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that collection of records - updating, creating, deleting, and reading some piece of data

// Review of Express //
- On the browser, the user makes a HTTP request, which goes to Express, and then Express sends a response to the browser to the user
- In GraphQL - Express determines of the request is asking for GraphQL. If yes, then Express sends request to GraphQL server, then sends back to Express, and then sends response back to browser


*/