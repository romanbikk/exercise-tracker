const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const userRoutes = require('./routes/user');

require('dotenv').config();
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@exercisetracker.h6vwy.mongodb.net/?retryWrites=true&w=majority&appName=ExerciseTracker`;
const PORT = process.env.PORT || 3000;

app.use('/', router.get('/', (req, res)=> {  
  res.sendFile(__dirname + '/views/index.html');
}));
app.use('/api', userRoutes);

const start = async () => {
  try {
    console.log('URI ===>', uri);
    await mongoose.connect(uri, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      }});
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  } catch (e) {
    console.error(e);
  }
};

start();





// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port)
// })
