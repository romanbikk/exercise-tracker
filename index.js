const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const appRoutes = require('./routes/app');
const userRoutes = require('./routes/user');

require('dotenv').config();
app.use(cors())
app.use(express.static('public'));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@exercisetracker.h6vwy.mongodb.net/?retryWrites=true&w=majority&appName=ExerciseTracker`;
const PORT = process.env.PORT || 3000;

app.use('/', appRoutes);
app.use('/api', userRoutes);

const start = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
