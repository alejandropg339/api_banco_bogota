const express =require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/city'));
app.use(require('./routes/account'));
app.use('/transaction-type', require('./routes/transaction-type'));
app.use('/transaction', require('./routes/transaction'));

app.listen(3000, ()=>{
    console.log('Servidor Iniciado ...');
});
