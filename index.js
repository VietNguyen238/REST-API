const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authorRouter = require('./routers/author')
const bookRouter = require('./routers/book')

dotenv.config();

// conect database
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("conected to mongoDB")
})

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

// Router
app.use('/v1/author', authorRouter)
app.use('/v1/book', bookRouter)

app.get("/api", (req, res) => {
    res.status(200).json("hello");
})

app.listen(8000, () => {
    console.log('server is running....')
})