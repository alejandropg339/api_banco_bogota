const express =require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


//Routes
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(require('./routes/index'));
app.use(require('./routes/city'));
app.use(require('./routes/account'));
app.use('/transaction-type', require('./routes/transaction-type'));
app.use('/transaction', require('./routes/transaction'));

app.listen(3000, ()=>{
    console.log('Servidor Iniciado ...');
});
