const express = require('express');
const router = express.Router();

const pool = require('../database');

//----------- INSERT TRANSACTION ------------

router.post('/new', async function (req, res){
    const {id, valor, tipo, cuenta} =  req.body;
    try{

        console.log(id, valor, tipo, cuenta);
        await pool.query('INSERT INTO transaccion values(?, ?, NOW(), ?, ?)', [id, valor, tipo, cuenta]);
        console.log('Se inserto correctamente la cuenta');
        res.send('Se inserto correctamente la transacción');

    }catch (err){
        res.send(err);
    }

});


// -------------- SELECT TRANSACTIONS---------------

router.get('/transactions', async (req, res) => {
    const transactions = await pool.query('SELECT * FROM transaccion');
    const listTransactions =[];
    transactions.forEach(transaction =>{
        console.log(transaction);
        listTransactions.push(transaction);
    });
    await res.send(listTransactions);
});


// -------------- UPDATE TRANASACTION ---------------

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const {valor, tipo, cuenta} =  req.body;

    await pool.query('UPDATE transaccion SET valor= ?, fecha=NOW(), tipo= ?, cuenta= ? WHERE id= ?', [valor, tipo, cuenta, id]);
    res.send('La Tranascción se actualizo correctamente');
});

// -------------- DELETE TRANSACTION ---------------

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM transaccion WHERE id= ?', [id]);
    console.log('Transaccion removida');
    res.send('Transaccion removida');
});

// -------------- SELECT TRANSACTION BY ID ---------------

router.get('/transaction/:id', async (req, res) =>{
    const { id } = req.params;
    const selectById = await pool.query(`SELECT * FROM transaccion WHERE id= ${id}`);
    res.send(selectById[0]);
});


// -------------- COUNT TRANSACTIONS ---------------

router.get('/cant-transactions', async (req, res) =>{
    const cantTransactions = await pool.query('SELECT COUNT(id) FROM transaccion');
    res.send(cantTransactions[0]);
});

module.exports = router;