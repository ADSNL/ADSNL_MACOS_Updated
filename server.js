const express = require('express');
var sql = require('mssql');
var cors = require('cors');

const app = express();

app.use(cors());

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
//const PORT = 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
