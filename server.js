/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
app.use(bodyParser.json());
app.use(cors);

const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port : 3306,
    database: 'sample'
});

client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + client.threadId);
});

// read 
app.get('/todos', (req, res) => {
    client.query('SELECT * from todos;', (err, rows, fields) => {
        if (err) throw err;

        res.send(rows);
    });
});

// create 
app.post('/todo/create', (req, res) => {
    const task = req.body.nataskme;
    const task_limited_at = req.body.task_limited_at;
    client.query('INSERT INTO todos SET ?', {task: task, task_limited_at: status}, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// update 
app.put('/todo/update', (req, res) => {
    const id = req.body.id;
    const status = req.body.task_limited_at1    ;
    client.query('UPDATE todo SET task = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) throw err;
        client.query('SELECT * from user;', (err, rows, fields) => {
            if (err) throw err;
            res.send(rows);
        });
    })
});

// delete 
app.delete('/todo/delete', (req, res) => {
    const id = req.body.id;
    client.query(`DELETE FROM todo WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        client.query('SELECT * from todo;', (err, rows, fields) => {
            if (err) throw err;
            res.send(rows);
        });
    });
});

app.listen(3001, () => console.log('Listening on port 3001!'))

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});