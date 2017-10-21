var mysql = require('mysql');
var creds = require('./credentials.js'); // This file is local only for security reasons. When live the process.env.* variables won't be null.

/* Globals */
var connectionPool;
var poolConnectionObj = {
    connectionLimit: 10,
    host: (process.env.RDS_HOSTNAME != null ? process.env.RDS_HOSTNAME : creds.dbHost),
    user: (process.env.RDS_USERNAME != null ? process.env.RDS_USERNAME : creds.dbUser),
    password: (process.env.RDS_PASSWORD != null ? process.env.RDS_PASSWORD : creds.dbPass),
    port: (process.env.RDS_PORT != null ? process.env.RDS_PORT : creds.dbPort),
    database: 'ebdb'
};

function init(){
    connectionPool = mysql.createPool(poolConnectionObj);
}

init();


module.exports = {
    query: function(queryString){
        return new Promise(function(resolve, reject){
            connectionPool.getConnection(function(err, connection){
                console.log("Executing Query: ", queryString);
                connection.query(queryString, function(error, results, fields){
                    connection.release();
                    if(error){
                        console.log("Error when querying DB.....");
                        console.log(error);
                        reject(error);
                        return null;
                    }

                    console.log("DB QUERY RESULTS:");
                    console.log(results);
                    resolve(results);
                    return results;
                });
            });

        });
    },
    test: function(){
        console.log("Getting Connection from Pool......");
        connectionPool.getConnection(function(err, conn){
            if(err){
                console.log(err);
                return;
            }

            console.log("Connection obtained successfully");
            
        });
    }
}