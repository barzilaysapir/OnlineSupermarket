const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "34.65.237.32",
    user: "root",
    password: "1234",
    database: "supermarket",
    dateStrings: "Date"
});

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log("Failed to create connection + " + err);
        return;
    }
    console.log("We're connected to MySQL");
});


// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {

            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {

            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};
