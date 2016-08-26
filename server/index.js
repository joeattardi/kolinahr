const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');

const webpackConfig = require('../webpack.config');

const port = process.env.PORT || 3000;

const app = express();

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }

  console.log('Connected to MongoDB');


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/public'));
  } else {
    console.log('Running in development mode');
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
  }

  app.use(bodyParser.json());

  app.get('/model', (req, res) => {
    const collection = db.collection('logicmodels');
    collection.find({}).toArray((findErr, docs) => {
      if (findErr) {
        console.error(`Failed to load model: ${findErr}`);
      } else {
        const model = docs[0];
        res.json(model);
      }
    });
  });

  app.post('/model', (req, res) => {
    const model = req.body;
    const collection = db.collection('logicmodels');
    console.log('Updating model');
    collection.updateOne({}, { $set: model }, (updateErr, result) => {
      if (updateErr) {
        console.error(`Failed to update model: ${updateErr}`);
        res.status(500).end();
      } else {
        console.log('Received updated model');
        res.status(200).json(result);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Kolinahr listening on port ${port}`);
  });
});

