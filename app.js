const path = require('path');

const express = require('express');
const mongooes = require('mongoose');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');

const productRouter = require('./router/product');
const categoryRouter = require('./router/category');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/product', productRouter);
app.use('/category', categoryRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.pia43gh.mongodb.net/restaurant?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
