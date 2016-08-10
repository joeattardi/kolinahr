const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist/public'));

app.listen(port, () => {
  console.log(`Kolinahr listening on port ${port}`);
});

