# FlyBuyTickets: REST API and Node.js Learned Code Examples

## Overview

This repository contains two parts:

- **REST API for Node.js** (folder `fly-buy-tickets`)
- **Code used for learning asynchronous JavaScript and Node.js concepts** (folders `Asynchronous-programming` and `Node.js-and-backend`)

## REST API for Node.js

### Technologies

- Bcrypt
- Body-parser
- Express
- Morgan
- MySQL2

### Project Description

This REST API is designed to power a "FlyBuyTickets" website for selling and booking air tickets. It handles requests from an Angular application, interacts with a MySQL database, securely hashes user passwords using bcrypt, and utilizes Express for routing and handling HTTP requests.

### Additional Folders

`/frontend-angular-service`: Contains code for handling requests from AngularJS to the REST API.

### Usage

1. **Install dependencies:**
    ```bash
    npm install
2. **Start the development server:**
    ```bash
    npm start
3. **Access the API: http://localhost:2222**

### Endpoints
- /flights: Get available flights
- /flights_places/:id: Get available flight places
- /users_flights:
    * POST: Book a flight for a user (with user data)
    * GET: Retrieve a user's flights (with flight parameters)
    * DELETE: Cancel a user's flight (with flight parameters)
- /registration: POST: Create a new user (with user data)
- /login: GET: Retrieve user data (if login and password are correct)

## Code for Learning Concepts
The Asynchronous-programming and Node.js-and-backend directories provide examples for learning the following concepts:

- Callbacks
- Promises
- Generators
- Timers
- Async/await (used in the REST API)
- Node.js modules
- Clustering