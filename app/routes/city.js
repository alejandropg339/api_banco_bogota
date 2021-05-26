const express = require('express');
const router = express.Router();

const pool = require('../database');

// -------------- INSERT CITY ---------------

router.post('/add-city', async (req, res) => {
    const {id, nombre} = req.body;
    const newCity ={
        id,
        nombre
    }
    await pool.query('INSERT INTO ciudad set ?',[newCity]);
    res.send('Se inserto corectamente la ciudad');
});


// -------------- SELECT CITYS ---------------

router.get('/citys', async (req, res) => {
    const citys = await pool.query('SELECT * FROM ciudad');
    const listCitys =[];
    citys.forEach(city =>{
        console.log(city);
        listCitys.push(city);
    });
    await res.send(listCitys);
    
});

// -------------- UPDATE CITY ---------------

router.put('/update-city/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const updateCity = await pool.query('UPDATE ciudad SET nombre= ? WHERE id= ?', [nombre, id]);
    res.send('La ciudad se actualizo correctamente');
});


// -------------- DELETE CITY ---------------

router.delete('/remove-city/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM ciudad WHERE id= ?', [id]);
    console.log('Ciudad removida');
    res.send('Ciudad removida');
    
});


// -------------- SELECT CITY BY ID ---------------

router.get('/city/:id', async (req, res) =>{
    const { id } = req.params;
    const selectById = await pool.query('SELECT * FROM ciudad WHERE id= ?', [id]);
    res.send(selectById[0]);
});


// -------------- COUNT CITY ---------------

router.get('/cant-citys', async (req, res) =>{
    const cantCitys = await pool.query('SELECT COUNT(id) FROM ciudad');
    res.send(cantCitys[0]);
});


module.exports =router;