const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const compression = require('compression');
const app = express();

//connect to datebase
connectDb().then(() => console.log('Database connected successfully'));

app.use(cors());
app.use(express.json({ extended: true }));
app.use(compression());
//define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// error handling
app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const info = {
    success: false,
    msg: error.message,
  };
  res.json(info);
  console.error(info);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));
