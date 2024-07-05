const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const router = require('../router/registro.router');

const app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

app.get('/', (req, res) => {
  res.send('Proyecto enlazado');
});

app.use("/api/v1",router);
module.exports = app;