const puppeteer = require('puppeteer')
let scrape = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.camara.leg.br/transparencia/gastos-parlamentares?legislatura=56&ano=2020&mes=&por=deputado&deputado=107283&uf=&partido=');
  
  const result = await page.evaluate(() => {
    
    const importantContent = document.getElementById('js-tipo-despesa-chart');
    const table = importantContent.getElementsByTagName('table')[0];
    
    const trs = table.getElementsByTagName('tr');
    const infos = [];
    
    for (let index = 1; index < trs.length; index++) {
        let tds = trs[index].getElementsByTagName('td');
        let info = {
            "tipoCota": tds[0].textContent,
            "valor": tds[1].textContent
        };
        infos.push(info);
    }

    return infos;
  })
  
  browser.close()
  return result
};
scrape(process.argv.slice(2)).then((infos) => {
    console.log(infos)
});
