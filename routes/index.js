const express = require('express');
var sql = require('mssql');
const router = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var dbConfig = {
    server: 'localhost\\MSSQLSERVER',
    database: 'MACOS_4mil',
    user: 'ADSN',
    password: 'ADSNL_2020',
    Port: 1433
};

router.get('/api/books', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 4 Books.Book_ID,Book_Title as Title,ISBN_10 as Number,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Price FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/clothing', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT Top 4 * FROM Clothing', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewBooks', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Books.Book_ID,Book_Title as Title,ISBN_10 as Number,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Price FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewClothing', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Clothing_ID as Number, Clothing_Name as Title, Price as Price FROM Clothing', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewMovies', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Movie_ID as Number, Movie_Title as Title, 25 as Price FROM Movies', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewKitchen', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 K.Kitchen_Product_ID as Number, K.Kitchen_Product_Name as Title, KT.Price as Price FROM Kitchen AS K JOIN Kitchen_Types_Lookup AS KT ON K.Kitchen_Product_ID = KT.Kitchen_Product_ID', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewMakeUp', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Makeup_ID as Number, Makeup_Name as Title, 29 as Price FROM Makeup', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/viewPets', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Pets_ID as Number, Item_Model_Number as Title, Price as Price FROM Pets', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

router.get('/api/search/:searchTerm', (req, res) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query('SELECT TOP 24 Pets_ID as Number, Item_Model_Number as Title, Price as Price FROM Pets', (err, recordset) => {
            if (err) {
                console.log(err);
                return;
            } else {
                const data = recordset;

                res.send(data.recordset);
            }
            conn.close(recordset);
        });
    });
});

module.exports = router;