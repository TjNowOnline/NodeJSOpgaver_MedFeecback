// Importerer de indbyggede Node.js-moduler 'http' og 'url'
const http = require('http');
const url = require('url');
//Definerer server adresse samt port
const hostname = 'localhost';
const port = 3000;
//Opretter server
const server = http.createServer((req, res) => {
    // Opretter et URL-objekt fra den indsendte URL
    const parsedUrl = new URL(req.url, `http://${hostname}:${port}`);
    const path = parsedUrl.pathname;
    // Sætter statuskode og header for svar
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // Forside rute
    if (path === '/') {
        res.end('Velkommen til Daniels mini-webserver 💀');
    }
    // Rute til tilfældigt tal
    else if (path === '/random') {
        const random = Math.floor(Math.random() * 100);
        res.end(`Tilfældigt tal: ${random}`);
    }
    //Rute til motivations-tekst
    else if (path === '/motivation') {
        const quotes = [
            "Tro på dig selv, selv når du dør i spillet 💪",
            "Respawn stronger.",
            "Kode som en konge, sov som en kat 😎",
            "Smerten er midlertidig, glory er evig 💀"
        ];
        //Vælger et tilfældigt motivations-tekst fra arrayet
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.end(randomQuote);
    }
    //Rute til gamer
    else if (path === '/gamer') {
        const name = parsedUrl.searchParams.get('name');
        const game = parsedUrl.searchParams.get('game');

        if (name && game) {
            res.end(`${name} spiller ${game}`);
            // Feljbesked hvis man skriver noget forkert
        } else {
            res.end('Manglende query-parametre! Brug fx /gamer?name=Emil&game=Minecraft');
        }
    }
    else {
        res.statusCode = 404;
        res.end('404 - Denne route findes ikke 💀');
    }
});
// Starter serveren
server.listen(port, hostname, () => {
    console.log(`Server kører på http://${hostname}:${port}/`);
});
