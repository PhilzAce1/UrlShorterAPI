const express = require('express');
const connectDb = require('./config/db');

const app = express();


//connect to datebase
connectDb();


app.use(express.json({extended: false}));


//define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`))