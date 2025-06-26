const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from DevSecOps app!');
});

app.get('/error', (req, res) => {
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
