const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello to Rakesh Dontula API');
});
app.listen(5000, () => console.log(`Server Running on Port: http://localhost:5000`));
