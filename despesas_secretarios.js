const puppeteer = require('puppeteer')

module.exports =  async (idDeputado) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.camara.leg.br/deputados/'+idDeputado+'/verba-gabinete?ano=2020');
  
  const result = await page.evaluate(() => {
    var table = document.getElementsByClassName('table')[0];
    const valores = table.getElementsByTagName('tr');
    let gastos = [];

    for (let row = 1; row < valores.length; row++) {
        let mes = valores[row].getElementsByTagName('td')[0].innerHTML;
        let valorDisponivel = valores[row].getElementsByTagName('td')[1].innerHTML;
        let valorGasto = valores[row].getElementsByTagName('td')[2].innerHTML;
        gastos.push({
            'mes': mes,
            'valorDisponivel': valorDisponivel,
            'valorGasto': valorGasto
        });
    }
    return gastos;
  });
  
  browser.close();
  return result;
};

