const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger')
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


;

//Load env variables
dotenv.config({path: './config/config.env'});
const app = express();

//connect to Database
connectDB();

//Routes files
const bootcamps = require('./Routes/bootcamps')
const courses = require('./Routes/courses')

//body parser
app.use(express.json());

//Dev logging env
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
};

// app.use(logger);

//Mount router
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5000


const server = app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red);

    //close server and exit process
    server.close(()=> process.exit(1));
});


