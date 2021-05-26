const express = require('express');
const router = express.Router();

const pool = require('../database');

//----------- INSERT ACCOUNT ------------

router.post('/new-count', async function (req, res){
    const {num, cedula, nombre, telefono, saldo, ciudad_id} =  req.body;
    const newAccount = {
        num,
        cedula,
        nombre,
        telefono,
        saldo,
        ciudad_id
    }
    
    await pool.query('INSERT INTO cuenta set ?', [newAccount]);
    console.log('Se inserto correctamente la cuenta');
    res.send('Se inserto correctamente la cuenta');
});


// -------------- SELECT ACCOUNTS---------------

router.get('/accounts', async (req, res) => {
    const accounts = await pool.query('SELECT * FROM cuenta');
    const listAccounts = [];
    accounts.forEach(account =>{
        console.log(account);
        listAccounts.push(account);
    });
    res.send(listAccounts);
});


// -------------- UPDATE CITY ---------------

router.put('/update-account/:num', async (req, res) => {
    const { num } = req.params;
    const { cedula, nombre, telefono, saldo, ciudad_id } = req.body;
    const newData = { 
        cedula, 
        nombre, 
        telefono, 
        saldo, 
        ciudad_id
    }
    const updateCity = await pool.query('UPDATE cuenta SET cedula= ?, nombre= ?, telefono= ?, saldo= ?, ciudad_id= ? WHERE num= ?', [cedula,nombre,telefono, saldo, ciudad_id, num]);
    res.send('La ciudad se actualizo correctamente');
});

// -------------- DELETE ACOUNT ---------------

router.delete('/remove-account/:num', async (req, res) => {
    const { num } = req.params;
    await pool.query('DELETE FROM cuenta WHERE num= ?', [num]);
    console.log('Cuenta removida');
    res.send('Cuenta removida');
    
});

// -------------- SELECT ACCOUNT BY ID ---------------

router.get('/account/:num', async (req, res) =>{
    const { num } = req.params;
    const selectById = await pool.query('SELECT * FROM cuenta WHERE num= ?', [num]);
    res.send(selectById[0]);
});


// -------------- COUNT ACCOUNT ---------------

router.get('/cant-accounts', async (req, res) =>{
    const cantAccounts = await pool.query('SELECT COUNT(num) FROM cuenta');
    res.send(cantAccounts[0]);
});

module.exports = router;
