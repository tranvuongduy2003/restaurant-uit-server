const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const mongooes = require('mongoose');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const productRouter = require('./router/product');
const categoryRouter = require('./router/category');

const app = express();

const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pia43gh.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

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

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    // https
    //   .createServer({ key: privateKey, cert: certificate })
    //   .listen(process.env.PORT || 3000);
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log(error);
  });
