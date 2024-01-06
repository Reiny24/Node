const db = require('../util/database')

module.exports = class Flights {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    static fetchAll(database, flightID, userID) {
        let query = `SELECT * FROM ${database} WHERE 1`;
        if (flightID !== '-3') query += ` AND flightID = ${flightID}`;
        if (userID !== '-3') query += ` AND userID = ${userID}`;
        return db.execute(query);
    }

    static fetchFilters(database, filters) {
        let query = `SELECT * FROM ${database} WHERE 1`;

        if (filters.from)  query += ` AND from_country = '${filters.from}'`;
    
        if (filters.to) query += ` AND to_country = '${filters.to}'`;
        
        if (filters.shipping) query += ` AND date = '${filters.shipping}'`;

        if (filters.travelers) query += ` AND places >= '${filters.travelers}'`;

        if (filters.salon) {
            if (filters.salon === "Економ") query += ' AND economAvailable > 0';
            else if (filters.salon === "Бізнес") query += ' AND businessAvailable > 0';
            else if (filters.salon === "Перший") query += ' AND firstAvailable > 0';
        }
        return db.execute(query);
    }

    static fetchUser(login) {
        return db.execute('SELECT * FROM users WHERE login = ?', [login])
    }

    static postFlight(database, flight, userId, mobile) {
        return db.execute(`INSERT INTO ${database} (flightID, userID, title, date, time, place, placeID, price, salon, mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [flight.flightID, userId, flight.title, flight.date, flight.time, flight.place, flight.placeID, flight.price, flight.salon, mobile]);
    }

    static postAccount(lastname, firstname, mobile, login, password) {
        return db.execute(`INSERT INTO users (lastname, firstname, mobile, login, password, mobile) VALUES (?, ?, ?, ?, ?)`, [lastname, firstname, mobile, login, password]);
    }
    
    static update(database, flight, userID) {
        if (flight.salon === 'Економ') db.execute(`UPDATE flights SET economAvailable = economAvailable - 1 WHERE id = (?)`, [flight.flightID]);
        else if (flight.salon === 'Бізнес') db.execute(`UPDATE flights SET businessAvailable = businessAvailable - 1 WHERE id = (?)`, [flight.flightID]);
        else db.execute(`UPDATE flights SET firstAvailable = firstAvailable - 1 WHERE id = (?)`, [flight.flightID]);
        let query = `UPDATE ${database} SET seat = ${userID}, isBought = 1 WHERE flightID = ${flight.flightID} AND placeID = ${flight.placeID}`
        console.log(query)
        return db.execute(`UPDATE ${database} SET seat = ?, isBought = 1 WHERE flightID = ? AND id = ?`, [userID, flight.flightID, flight.placeID]);
    }

    static delete(database, id) {
        return db.execute(`DELETE FROM ${database} WHERE id = ?`, [id]);
    }
}