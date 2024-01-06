const Flights = require('../modules/flights');
const bcrypt = require('bcrypt');

exports.getData = async (req, res, next) => {
    try {
        if (req.params.database === "login") {
            const [user] = await Flights.fetchUser(req.query.login);
            if (user.length === 0) return res.status(400).send('Cannot find user');
            else if (await bcrypt.compare(req.query.password, user[0].password)) res.status(200).json(user);
            else res.send('Not allowed')
        }

        else if (req.params.database === "users_flights") {
            const [data] = await Flights.fetchAll(req.params.database, req.query.flightID, req.query.userID);
            res.status(200).json(data);
        }

        else if (req.params.database === "flights_places") {
            const [data] = await Flights.fetchAll(req.params.database, req.query.flightID, "-3");
            res.status(200).json(data);
        }
        // Обробка фільтрів
        else {
            const [data] = await Flights.fetchFilters(req.params.database, req.query);
            res.status(200).json(data);
        }
    }
    catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

exports.postData = async (req, res, next) => {
    try {
        if (req.params.database === "registration") {
            const [user] = await Flights.fetchUser(req.body.login);
            if (user.length === 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const [postResponse] = await Flights.postAccount(req.body.lastname, req.body.firstname, req.body.mobile, req.body.login, hashedPassword);
                res.status(201).json(postResponse);
            }
            else res.status(400).send('Login is busy');
        }
        else {
            const flights = req.body[0]
            const postResponse = []
            flights.forEach(async (flight) => {
                postResponse.push(await Flights.postFlight(req.params.database, flight, req.body[1], req.body[2]));
            })
            res.status(201).json(postResponse);
        }
    }
    catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

exports.putFlight = async (req, res, next) => {
    try {
        const flightsData = req.body.flights;

        const promises = flightsData.map(async (flight) => {
            return await Flights.update(req.params.database, flight, req.body.userID);
        });

        // Execute all flight insertions concurrently
        const changeFlights = await Promise.all(promises);
        res.status(201).json({ message: 'Flights added successfully', flights: changeFlights });
    }
    catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

exports.deleteFlight = async (req, res, next) => {
    try {
        const [deleteResponse] = await Flights.delete(req.params.database, req.params.id);
        res.status(201).json(deleteResponse);
    }
    catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}