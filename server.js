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
  server: 'ADSNL01-5820',
  Port: 1433,
  database: 'ADSNL',
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  user: 'ADSN',
  password: 'ADSNL_2020'
};

sql.connect(dbConfig, (err) => {
  if (err) {
    console.log("ERROR IS HERE BC : " + err);
  }
  else {
    console.log("Connected to the database");
  }
});

app.get('/api/navlinks', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect((error) => {
    if (error) {
      console.log(error);
      return;
    }
    req.query(`select * from Department`, (error, recordset) => {
      if (error) {
        console.log(error);
        return;
      }
      else {
        const data = recordset;
        res.send(data.recordset);
      }
      conn.close(recordset);
    });
  })
});

app.get('/api/books', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`select top 4 pi.Prod_SKU as SKU, pi.Dept_ID as deptID, pi.Prod_Name as Title, pi.Prod_ISBN_10 as Number, ml.Media_Price as Price
                  from Product_Info as pi join Media_Lookup as ml
                  on ml.Prod_SKU = pi.Prod_SKU
                  where pi.Dept_ID = 1`, (err, recordset) => {
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
    req.query(`select top 4 pi.Prod_SKU as SKU, pi.Dept_ID as deptID, pi.Prod_Name as Title, pi.Prod_Price as Price
                from Product_Info as pi
                where pi.Dept_ID = 2`, (err, recordset) => {
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

// app.get('/api/movies', (req, res) => {
//   var conn = new sql.ConnectionPool(dbConfig);
//   var req = new sql.Request(conn);
//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     req.query(`select top 4 pi.Prod_SKU as Movie_Genre_Name, pi.Prod_Name as Movie_Title
//                   from Product_Info as pi
//                   where Dept_ID = 5`, (err, recordset) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         const data = recordset;

//         res.send(data.recordset);
//       }
//       conn.close(recordset);
//     });
//   });
// });

app.get('/api/moviesdetails', (req, res) => {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.query(`select top 4 pi.Prod_SKU as SKU, pi.Prod_Name as Movie_Title, fl.Feature_Price as Price, b.Brand_Name as Movie_Genre_Name
                from Product_Info as pi join Feature_Lookup as fl
                on pi.Prod_SKU = fl.Prod_SKU join Brand as b
                on pi.Brand_ID = b.Brand_ID
                where pi.Dept_ID = 5`, (err, recordset) => {
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
    req.query(`select BD.ID, BD.Title, BD.Number, BD.Prod_ISBN_13, BD.Price,
      (select count(distinct Product_Info.Prod_SKU) from Product_Info join dbo.Media_Lookup 
      on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU where Product_Info.Dept_ID = 1) as CatCount
      from (select Product_Info.Prod_SKU as ID, Product_Info.Prod_Name as Title, Product_Info.Prod_ISBN_10 as Number, 
        Product_Info.Prod_ISBN_13, Media_Lookup.Media_Price as Price, ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info join dbo.Media_Lookup on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU where Product_Info.Dept_ID = 1) as BD
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
    req.query(`select C.Number, C.Title, C.Price, C.CatCount
    from (
      select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, Product_Info.Prod_Price as Price,
      (select count(*) from Product_Info where Product_Info.Dept_ID = 2) as CatCount, 
      ROW_NUMBER() OVER (order by Product_Info.Prod_SKU) as RowNum
      from Product_Info where Product_Info.Dept_ID = 2
    ) as C
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
    req.query(`select M.Number, M.Title, M.Price, M.CatCount
    from (
      select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, fl.Feature_Price as Price, 
      (select count(*) from Product_Info where Product_Info.Dept_ID = 5) as CatCount, 
      ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
      from Product_Info join Feature_Lookup as fl on Product_Info.Prod_SKU = fl.Prod_SKU
      where Product_Info.Dept_ID = 5
    ) as M
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
    req.query(`select K.Number, K.Title, K.Price, K.CatCount
    from (
      select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, tl.Type_Price as Price,
      (select count(distinct Product_Info.Prod_SKU) from Product_Info where Product_Info.Dept_ID = 4) as CatCount,
      ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
      from Product_Info join Type_Lookup as tl on Product_Info.Prod_SKU = tl.Prod_SKU
      where Product_Info.Dept_ID = 4
    ) as K
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
    req.query(`select M.Number, M.Title, M.Price, M.CatCount
    from (
      select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, fl.Feature_Price as Price,
      (select count(*) from Product_Info where Product_Info.Dept_ID = 3) as CatCount, 
      ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
      from Product_Info join Feature_Lookup as fl on Product_Info.Prod_SKU = fl.Prod_SKU where Product_Info.Dept_ID = 3
    ) as M
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
    req.query(`select P.Number, P.Title, P.Price, P.CatCount
    from (
      select Prod_SKU as Number, Prod_Model_Number as Title, Prod_Price as Price, 
      (select count(*) from Product_Info where Dept_ID = 6) as CatCount, ROW_NUMBER() over (order by Prod_SKU) as RowNum
      from Product_Info where Dept_ID = 6
    ) as P
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
      req.query(`select BD.ID, BD.Title, BD.Number, BD.Prod_ISBN_13, BD.Price,
      (select count(distinct Product_Info.Prod_SKU) from Product_Info join dbo.Media_Lookup 
      on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU where Product_Info.Dept_ID = 1) as CatCount
      from (select Product_Info.Prod_SKU as ID, Product_Info.Prod_Name as Title, Product_Info.Prod_ISBN_10 as Number, 
        Product_Info.Prod_ISBN_13, Media_Lookup.Media_Price as Price, ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info join dbo.Media_Lookup on Product_Info.Prod_SKU = Media_Lookup.Prod_SKU where Product_Info.Dept_ID = 1) as BD
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
      req.query(`select C.Number, C.Title, C.Price, C.CatCount
      from (
        select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, Product_Info.Prod_Price as Price,
        (select count(*) from Product_Info where Product_Info.Dept_ID = 2) as CatCount, 
        ROW_NUMBER() OVER (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info where Product_Info.Dept_ID = 2
      ) as C
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
      req.query(`select M.Number, M.Title, M.Price, M.CatCount
      from (
        select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, fl.Feature_Price as Price, 
        (select count(*) from Product_Info where Product_Info.Dept_ID = 5) as CatCount, 
        ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info join Feature_Lookup as fl on Product_Info.Prod_SKU = fl.Prod_SKU
        where Product_Info.Dept_ID = 5
      ) as M
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
      req.query(`select K.Number, K.Title, K.Price, K.CatCount
      from (
        select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, tl.Type_Price as Price,
        (select count(distinct Product_Info.Prod_SKU) from Product_Info where Product_Info.Dept_ID = 4) as CatCount,
        ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info join Type_Lookup as tl on Product_Info.Prod_SKU = tl.Prod_SKU
        where Product_Info.Dept_ID = 4
      ) as K
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
      req.query(`select M.Number, M.Title, M.Price, M.CatCount
      from (
        select Product_Info.Prod_SKU as Number, Product_Info.Prod_Name as Title, fl.Feature_Price as Price,
        (select count(*) from Product_Info where Product_Info.Dept_ID = 3) as CatCount, 
        ROW_NUMBER() over (order by Product_Info.Prod_SKU) as RowNum
        from Product_Info join Feature_Lookup as fl on Product_Info.Prod_SKU = fl.Prod_SKU where Product_Info.Dept_ID = 3
      ) as M
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
      req.query(`select P.Number, P.Title, P.Price, P.CatCount
      from (
        select Prod_SKU as Number, Prod_Model_Number as Title, Prod_Price as Price, 
        (select count(*) from Product_Info where Dept_ID = 6) as CatCount, ROW_NUMBER() over (order by Prod_SKU) as RowNum
        from Product_Info where Dept_ID = 6
      ) as P
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
    req.query(`SELECT data_id, [year], order_count FROM ChartData`, (err, recordset) => {
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
      req.query(`select top 1 Customer_ID as ID, Customer_FName as FName, Customer_LName as LName, 
    Sex as Gender, Birth_Date as DOB, Zip_Code as Zip, City, State, Street_Name as StreetName, Income, Marital_Status_Type,
    Street_Number as Street from Customer_Master where Customer_FName like '%` + first_name + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          req.query(`select cm.Customer_ID, om.Order_ID, om.Order_DateTime, cm.Customer_FName as FName, cm.Customer_LName as LName, 
                      od.OrderDetails_ID, od.Prod_SKU, od.Price, od.Product_Media_ID, pi.Prod_Name as Title, d.Dept_Name
                      from Customer_Master as cm join Order_Master as om
                      on cm.Customer_ID = om.Customer_ID
                      join Order_Details as od
                      on od.Order_ID = om.Order_ID
                      join Product_Info as pi 
					            on od.Prod_SKU = pi.Prod_SKU
					            join Department as d
					            on pi.Dept_ID = d.Dept_ID
          where cm.Customer_ID =` + data.recordset[0].ID, (err, order_data) => {
            if (err) {
              console.log(err);
              return;
            } else {
              const customer_data = {
                "customer_info": data.recordset,
                "order_info": order_data.recordset
              }
              res.send(customer_data);
            }
          });
        }
      });
    }
    else {
      req.query(`select top 1 Customer_ID as ID, Customer_FName as FName, Customer_LName as LName, 
    Sex as Gender, Birth_Date as DOB, Zip_Code as Zip, City, State, Street_Name as StreetName, Income, Marital_Status_Type,
    Street_Number as Street from Customer_Master where Customer_FName like '%` + first_name + `%' and Customer_LName like '%` + last_name + `%'`, (err, recordset) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const data = recordset;
          req.query(`select cm.Customer_ID, om.Order_ID, om.Order_DateTime, cm.Customer_FName as FName, cm.Customer_LName as LName, 
                      od.OrderDetails_ID, od.Prod_SKU, od.Price, od.Product_Media_ID, pi.Prod_Name as Title, d.Dept_Name
                      from Customer_Master as cm join Order_Master as om
                      on cm.Customer_ID = om.Customer_ID
                      join Order_Details as od
                      on od.Order_ID = om.Order_ID
                      join Product_Info as pi 
					            on od.Prod_SKU = pi.Prod_SKU
					            join Department as d
					            on pi.Dept_ID = d.Dept_ID
          where cm.Customer_ID =` + data.recordset[0].ID, (err, order_data) => {
            if (err) {
              console.log(err);
              return;
            } else {
              const customer_data = {
                "customer_info": data.recordset,
                "order_info": order_data.recordset
              }
              res.send(customer_data);
            }
          });
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
//const PORT = 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
