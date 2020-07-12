var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var scrape = require('./despesa_por_cotas');

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/politicos/:politicoId/gastos-cota', async (req, res) => {
    const gastosCotas = await scrape(req.params.politicoId);
    res.send(gastosCotas);
 });

 app.get('/politicos/:politicoId/gastos-cota', async (req, res) => {
    const gastosCotas = await scrape(req.params.politicoId);
    res.send(gastosCotas);
 });

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})