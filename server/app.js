const express = require("express");
const cors = require('cors');
const server = express();
const port = process.env.port || 3001;

const errorHandler = require('./errors/error-handler');
const loginFilter = require('./middleware/login-filter');

// RESOURCES
const market = require("./controllers/market");
const products = require("./controllers/products");
const users = require("./controllers/users");
const carts = require("./controllers/carts");
const orders = require("./controllers/orders");
const categories = require("./controllers/categories");

/////////////////////////////////////////

server.use(express.json());
server.use(express.static('public'));

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(loginFilter());

server.use("/market", market);
server.use("/products", products);
server.use("/users", users);
server.use("/carts", carts);
server.use("/orders", orders);
server.use("/categories", categories);

server.use(errorHandler);

server.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`)
);
