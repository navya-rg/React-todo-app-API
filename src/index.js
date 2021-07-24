const express = require('express')
const app = express()
const port = 8080

var ListService = require('./modules/list-service');
ListService = new ListService();

app.get('/', (req, res) => {
    var data = {res: ListService.getAllLists()};
    res.send(data);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});