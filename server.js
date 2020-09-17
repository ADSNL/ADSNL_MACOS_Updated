const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
var sql = require('mssql');
var cors = require('cors');

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require('./routes/Users');

app.use('/users', Users);

var dbConfig = {
  server: 'adsndb.c0yzxuhp43yb.us-east-2.rds.amazonaws.com',
  database: 'MACOS',
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  user: 'ADSNL',
  password: 'ADSNL_2020',
  Port: 1433
};

app.get('/api/books', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query('SELECT TOP 4 Books.Book_ID,Books.Book_Title as Title,Books.ISBN_10 as Number,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Price FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID    ', (err, recordset) => {
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

app.get('/api/movies', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query('SELECT Top 4 * FROM Movies', (err, recordset) => {
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

app.get('/api/moviesdetails', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query('SELECT Top 4 * FROM Movies INNER JOIN Movie_Genres ON Movies.Movie_Genre_ID = Movie_Genres.Movie_Genre_ID', (err, recordset) => {
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

app.get('/api/customer/order', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`select top 10 cm.Customer_ID as ID, cm.Customer_FName as First_Name, cm.Customer_LName as Last_Name, cm.City as City,
		              om.order_id as Order_ID, om.order_date as Order_Date, om.order_time as Time
              from Customer_Master as cm 
              join Order_Master as om
              on cm.Customer_ID = om.customer_id`, (err, recordset) => {
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

app.get('/api/customer', (req, res) => {
  let first_name = req.query.firstname;
  let last_name = req.query.lastname;
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    if (last_name == "undefined" || last_name == '') {
      req.query(`select top 10 Customer_ID as ID, Customer_FName as FName, Customer_LName as LName, 
    Sex as Gender, Birth_Date as DOB, Zip_Code as Zip, City, State, Street_Name as StreetName, 
    Street_Number as Street, Street_Type as Avenue from Customer_Master where Customer_FName like '%` + first_name + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
          console.log(data.recordset);
        }
        conn.close(recordset);
      });
    }

    else {
      req.query(`select top 10 Customer_ID as ID, Customer_FName as FName, Customer_LName as LName, 
    Sex as Gender, Birth_Date as DOB, Zip_Code as Zip, City, State, Street_Name as StreetName, 
    Street_Number as Street, Street_Type as Avenue from Customer_Master where Customer_FName like '%` + first_name + `%' and Customer_LName like '%` + last_name + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
          console.log(data.recordset);
        }
        conn.close(recordset);
      });
    }
  });
});

app.get('/api/viewBooks', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT BD.Book_ID, BD.Title, BD.Number, BD.ISBN_13, BD.Book_Genre_ID, BD.Book_Publisher_ID, BD.Price,
    (SELECT COUNT(DISTINCT Books.Book_ID) FROM Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID = Book_Media_Lookup.Book_ID) AS CatCount
    FROM (
        SELECT Books.Book_ID,Book_Title as Title,ISBN_10 as Number,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Price, ROW_NUMBER() OVER (ORDER BY Books.Book_ID) AS RowNum
        FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID
    ) AS BD
    WHERE BD.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/viewClothing', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT C.Number, C.Title, C.Price, C.CatCount
    FROM (
        SELECT Clothing_ID as Number, Clothing_Name as Title, Price, (SElECT Count(*) FROM Clothing) AS CatCount, ROW_NUMBER() OVER (ORDER BY Clothing.Clothing_ID) AS RowNum
        FROM Clothing
    ) AS C
    WHERE C.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/viewMovies', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT M.Number, M.Title, M.Price, M.CatCount
    FROM (
        SELECT Movie_ID as Number, Movie_Title as Title, 25 as Price, (SElECT Count(*) FROM Movies) AS CatCount, ROW_NUMBER() OVER (ORDER BY Movie_ID) AS RowNum
        FROM Movies
    ) AS M
    WHERE M.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/viewKitchen', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT K.Number, K.Title, K.Price, K.CatCount
    FROM (
        SELECT K.Kitchen_Product_ID as Number, K.Kitchen_Product_Name as Title, KT.Price as Price, (SElECT Count(DISTINCT K.Kitchen_Product_ID) FROM Kitchen AS K JOIN Kitchen_Types_Lookup AS KT ON K.Kitchen_Product_ID = KT.Kitchen_Product_ID) AS CatCount, ROW_NUMBER() OVER (ORDER BY k.Kitchen_Product_ID) AS RowNum
        FROM Kitchen AS K JOIN Kitchen_Types_Lookup AS KT ON K.Kitchen_Product_ID = KT.Kitchen_Product_ID
    ) AS K
    WHERE K.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/viewMakeUp', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT M.Number, M.Title, M.Price, M.CatCount
    FROM (
        SELECT Makeup_ID as Number, Makeup_Name as Title, 29 as Price, (SElECT Count(*) FROM Makeup) AS CatCount, ROW_NUMBER() OVER (ORDER BY Makeup_ID) AS RowNum
        FROM Makeup
    ) AS M
    WHERE M.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/viewPets', (req, res) => {

  let startRange = req.query.startRange;
  let endRange = req.query.endRange;

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT P.Number, P.Title, P.Price, P.CatCount
    FROM (
        SELECT Pets_ID as Number, Item_Model_Number as Title, Price, (SElECT Count(*) FROM Pets) AS CatCount, ROW_NUMBER() OVER (ORDER BY Pets_ID) AS RowNum
        FROM Pets
    ) AS P
    WHERE P.RowNum BETWEEN `+ startRange + `and ` + endRange, (err, recordset) => {
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

app.get('/api/search/', (req, res) => {
  let parameter = req.query.search;
  let category = req.query.category;
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    if (category == 'Books') {
      req.query(`SELECT BD.Book_ID, BD.Title, BD.Number, BD.ISBN_13, BD.Book_Genre_ID, BD.Book_Publisher_ID, BD.Price,
    (SELECT COUNT(DISTINCT Books.Book_ID) FROM Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID = Book_Media_Lookup.Book_ID) AS CatCount
    FROM (
        SELECT Books.Book_ID,Book_Title as Title,ISBN_10 as Number,ISBN_13,Book_Genre_ID,Book_Publisher_ID,min(Unit_Price) as Price, ROW_NUMBER() OVER (ORDER BY Books.Book_ID) AS RowNum
        FROM  Books JOIN dbo.Book_Media_Lookup ON Books.Book_ID=Book_Media_Lookup.Book_ID GROUP BY Books.Book_ID,Book_Title,ISBN_10,ISBN_13,Book_Genre_ID,Book_Publisher_ID
    ) AS BD
    WHERE BD.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }

    if (category == 'Clothing') {
      req.query(`SELECT C.Number, C.Title, C.Price, C.CatCount
      FROM (
          SELECT Clothing_ID as Number, Clothing_Name as Title, Price, (SElECT Count(*) FROM Clothing) AS CatCount, ROW_NUMBER() OVER (ORDER BY Clothing.Clothing_ID) AS RowNum
          FROM Clothing
      ) AS C
    WHERE C.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }

    if (category == "Movies") {
      req.query(`SELECT M.Number, M.Title, M.Price, M.CatCount
      FROM (
          SELECT Movie_ID as Number, Movie_Title as Title, 25 as Price, (SElECT Count(*) FROM Movies) AS CatCount, ROW_NUMBER() OVER (ORDER BY Movie_ID) AS RowNum
          FROM Movies
      ) AS M
    WHERE M.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }

    if (category == "Kitchen") {
      req.query(`SELECT K.Number, K.Title, K.Price, K.CatCount
      FROM (
          SELECT K.Kitchen_Product_ID as Number, K.Kitchen_Product_Name as Title, KT.Price as Price, (SElECT Count(DISTINCT K.Kitchen_Product_ID) FROM Kitchen AS K JOIN Kitchen_Types_Lookup AS KT ON K.Kitchen_Product_ID = KT.Kitchen_Product_ID) AS CatCount, ROW_NUMBER() OVER (ORDER BY k.Kitchen_Product_ID) AS RowNum
          FROM Kitchen AS K JOIN Kitchen_Types_Lookup AS KT ON K.Kitchen_Product_ID = KT.Kitchen_Product_ID
      ) AS K
    WHERE K.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }

    if (category == "Make up") {
      req.query(`SELECT M.Number, M.Title, M.Price, M.CatCount
      FROM (
          SELECT Makeup_ID as Number, Makeup_Name as Title, 29 as Price, (SElECT Count(*) FROM Makeup) AS CatCount, ROW_NUMBER() OVER (ORDER BY Makeup_ID) AS RowNum
          FROM Makeup
      ) AS M
    WHERE M.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }

    if (category == "Pets") {
      req.query(`SELECT P.Number, P.Title, P.Price, P.CatCount
      FROM (
          SELECT Pets_ID as Number, Item_Model_Number as Title, Price, (SElECT Count(*) FROM Pets) AS CatCount, ROW_NUMBER() OVER (ORDER BY Pets_ID) AS RowNum
          FROM Pets
      ) AS P
    WHERE P.Title like '%` + parameter + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          res.send(data.recordset);
        }
        conn.close(recordset);
      });
    }
  });
});

app.get('/api/chartData', (req, res) => {

  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`SELECT data_id, [year], order_count FROM Chart_Data`, (err, recordset) => {
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
