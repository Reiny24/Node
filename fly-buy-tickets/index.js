const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const flightsRoutes = require('./routes/flights');

const errorController = require('./controllers/error');


const port = process.env.PORT || 2222;

app.use(morgan('dev'))  // Logging
app.use(bodyParser.json());

// preventing CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/', flightsRoutes);    // route which handles requests

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(port, () => console.log(`listening on port ${port}`));