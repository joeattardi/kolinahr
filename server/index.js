const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, error => {
  if (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    process.exit(1);
  }

  console.log('Connected to MongoDB');
});

app.use(express.static('dist/public'));

app.listen(port, () => {
  console.log(`Kolinahr listening on port ${port}`);
});

