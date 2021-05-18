const express = require('express');
const router = express.Router();

const pool = require('../database');

// -------------- INSERT TRANSACTION ---------------

router.post('/add', async (req, res) => {
    const {id, nombre} = req.body;
    const newTransaction ={
        id,
        nombre
    }
    await pool.query('INSERT INTO tipo_transaccion set ?',[newTransaction]);
    res.send('Se inserto corectamente el tipo de transacción');
});


// -------------- SELECT TRANSACTIONS ---------------

router.get('/transactions', async (req, res) => {
    const transactions = await pool.query('SELECT * FROM tipo_transaccion');
    transactions.forEach(transaction =>{
        console.log(transaction);
        res.send(transaction);
    });
    
});

// -------------- UPDATE TRANSACTIONS ---------------

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const updateTransaction = await pool.query('UPDATE tipo_transaccion SET nombre= ? WHERE id= ?', [nombre, id]);
    res.send('El tipo de transaccion se actualizo correctamente');
});


// -------------- DELETE TRANSACTIONS ---------------

router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tipo_transaccion WHERE id= ?', [id]);
    console.log('Tipo de transaccion removida');
    res.send('Tipo de transaccion removida');
    
});


// -------------- SELECT TRANSACTION BY ID ---------------

router.get('/transaction/:id', async (req, res) =>{
    const { id } = req.params;
    const selectById = await pool.query('SELECT * FROM tipo_transaccion WHERE id= ?', [id]);
    res.send(selectById[0]);
});


// -------------- COUNT TRANSACTION ---------------

router.get('/cant', async (req, res) =>{
    const cantTransactionTypes = await pool.query('SELECT COUNT(id) FROM tipo_transaccion');
    res.send(cantTransactionTypes[0]);
});


module.exports = router;