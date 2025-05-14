// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const noteRoutes = require('./routes/notes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/notes', noteRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
