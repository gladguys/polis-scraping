const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.camara.leg.br/transparencia/gastos-parlamentares');

    const result = await page.evaluate(() => {
      
        const mapa = document.getElementById('svg-map');
        const estadosDom = mapa.getElementsByClassName('mapa-estado');
        let estados = [];

        for (let iuf = 0; iuf < estadosDom.length; iuf++) {
            let estado = {
                'nomeUF': estadosDom[iuf].getAttribute('data-original-title'),
                'cotaDisponivel': estadosDom[iuf].getAttribute('data-content')};

            estados.push(estado);
        }
        return estados;
    });

    browser.close();
    return result
};