const express = require('express');
var sql = require('mssql');
var cors = require('cors');

const app = express();

app.use(cors());

var dbConfig = {
  server: 'localhost\\MSSQLSERVER',
  database: 'MACOS_4mil',
  user: 'ADSN',
  password: 'ADSNL_2020',
  Port: 1433
};

app.get('/api/books', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query('SELECT TOP 4 Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Unit_Price FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID    ', (err, recordset) => {
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

app.get('/api/clothing', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function(err) {
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

const PORT = process.env.PORT || 5000;
//const PORT = 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
