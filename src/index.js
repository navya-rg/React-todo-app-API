const express = require('express')
const app = express()
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 8080

const path = require('path');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.resolve('./src/assets', 'db.sqlite'), (err) => {
    if (err) {
      console.log('Could not connect to database', err)
    } else {
      console.log('Connected to database')
    }
})

var ListService = require('./modules/list-service');
ListService = new ListService(db);

var InitDB = require('./modules/init-db');
InitDB = new InitDB(db);

function sendResponse(functionTocall, req, res) {
    functionTocall(req)
    .then(response => {
        res.send({res: response});
    })
    .catch(err => {
        res.send({err: err});
    });
}

// LIST FUNCTIONALITIES

app.get('/get-all-lists', (req, res) => {
    sendResponse(ListService.getAllLists, req, res);
});

app.post('/new-list', (req, res) => {
    sendResponse(ListService.createNewList, req.body, res);
});

app.put('/update-list', (req, res) => {
    sendResponse(ListService.updateList, req.body, res);
});

app.put('/star-list', (req, res) => {
    sendResponse(ListService.starList, req.body, res);
});

app.delete('/delete-list/:id', (req, res) => {
    sendResponse(ListService.deleteList, req.params, res);
});

app.get('/create-tables', (req, res) => {
    sendResponse(InitDB.createTables, req, res);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    InitDB.createTables();
});