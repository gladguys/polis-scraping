const puppeteer = require('puppeteer');

let scrape = async () => {
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

scrape().then((cotasPorEstados) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080/api/despesas/cota/total-estado', true);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("Realizado com sucesso!!");
        } else {
            console.error("Ocorreu um problema!!");
        }
    }

    xhr.send(JSON.stringify(cotasPorEstados));
});