const express = require('express');
var sql = require("mssql"); 
var cors = require("cors");

const app = express();

app.use(cors());

var dbConfig = {
  server: "localhost\\MSSQLSERVER",
  database: "MACOS_4mil",
  user: "ADSN",
  password: "ADSNL_2020",
  Port: 1433
};

app.get('/api/response', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query("SELECT Top 3 * FROM Books", function (err, recordset) {
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
