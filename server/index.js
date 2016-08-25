const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;

const app = express();

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }

  console.log('Connected to MongoDB');
});

app.use(express.static('dist/public'));

app.listen(port, () => {
  console.log(`Kolinahr listening on port ${port}`);
});

