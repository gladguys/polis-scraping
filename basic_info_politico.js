const puppeteer = require('puppeteer')
let scrape = async (idDeputado) => {
    var myArgs = process.argv.slice(2);

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.camara.leg.br/deputados/'+idDeputado)
  
  const result = await page.evaluate(() => {
     
    const nomeDeputado = document.getElementById('nomedeputado').innerText;
    const salarioDiv = document.getElementsByClassName('beneficio')[1].getElementsByClassName('beneficio__info')[0].innerText;
    const pessoalGabinete = document.getElementsByClassName('beneficio')[0].getElementsByClassName('beneficio__info')[0].innerText;

    return {
        'nomeDeputado': nomeDeputado,
        'salario': salarioDiv,
        'pessoalGabinete': pessoalGabinete
    };
  })
  
  browser.close()
  return result
};
scrape(process.argv.slice(2)).then((value) => {
    console.log(value)
});

