const puppeteer = require('puppeteer')

module.exports = async (politicoId, ano) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox',]
  });

  if (ano == null) ano = "";
  const page = await browser.newPage();

  //turns request interceptor on
  await page.setRequestInterception(true);

  //if the page makes a  request to a resource type of image or stylesheet then abort thatrequest
  page.on('request', request => {
    if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
      request.abort();
    else
      request.continue();
  });

  await page.goto('https://www.camara.leg.br/transparencia/gastos-parlamentares?legislatura=56&ano=' + ano + '&mes=&por=deputado&deputado=' + politicoId + '&uf=&partido=');
  await page.waitForSelector('#js-tipo-despesa', { timeout: 3000 }).catch(() => console.log('Não foi possivel achar informação necessaria.'));

  const result = await page.evaluate(() => {
    const table = document.getElementById('js-tipo-despesa');
    const trs = table.getElementsByTagName('tr');
    const infos = [];

    for (let index = 1; index < trs.length; index++) {
      let tds = trs[index].getElementsByTagName('td');
      let info = {
        "tipoCota": tds[0].textContent,
        "valor": tds[1].textContent,
        "percentual": tds[2].textContent
      };
      infos.push(info);
    }
    return infos;
  });

  browser.close();
  return result;
};

