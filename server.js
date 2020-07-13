var express = require('express');
var app = express();
var scrapeGastoTipoCotas = require('./despesa_por_cotas');
var scrapeDespesaSecretarios = require('./despesas_secretarios');
var scrapeCotasEstados = require('./cotas_estado');

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/politicos/:politicoId/gastos-cota', async (req, res) => {
    const gastosCotas = await scrapeGastoTipoCotas(req.params.politicoId);
    res.send(gastosCotas);
 });

 app.get('/politicos/:politicoId/despesa-secretarios', async (req, res) => {
    const despesasSecretarios = await scrapeDespesaSecretarios(req.params.politicoId);
    res.send(despesasSecretarios);
 });

 app.get('/cotas/cota-estados', async (req, res) => {
   const cotasEstados = await scrapeCotasEstados();
   res.send({'cotasEstados':cotasEstados});
});

var server = app.listen(process.env.PORT || 5000, function () {
   console.log('Polis Scraping escutando...')
});