const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const port = process.env.PORT || 3000;

const app = express();

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }

  console.log('Connected to MongoDB');

  const collection = db.collection('logicmodels');
  collection.find({}).toArray((findErr, docs) => {
    const model = docs[0];

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('dist/public'));
    } else {
      console.log('Running in development mode');
      const compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler));
    }

    app.get('/model', (req, res) => {
      res.json(model);
    });

    app.listen(port, () => {
      console.log(`Kolinahr listening on port ${port}`);
    });
  });
});

