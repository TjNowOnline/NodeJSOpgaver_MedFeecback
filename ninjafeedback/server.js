const express = require('express');
const fs = require('fs-extra');
const EventEmitter = require('events');

const app = express();
const port = 3000;
const logger = new EventEmitter();
app.use(express.json());

// Enkelt in-memory "login" (ikke-sikkert)
const users = { admin: '1234' };
const sessions = new Set();

// Endpoint-statistik - viser hvor mange gange hver endpoint er kaldt
// Statistikken findes ved at lave en GET-request til /stats i POSTMAN
const endpointStats = {};

// Log event til fil med timestamp
logger.on('log', async message => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    await fs.appendFile('server.log', logMessage);
});

// Middleware til log og statistik
app.use((req, res, next) => {
    logger.emit('log', `Request: ${req.method} ${req.url}`);
    endpointStats[req.url] = (endpointStats[req.url] || 0) + 1;
    next();
});

// Login endpoint eller route
// Uden først at lave en POST-request til /login i POSTMAN med korrekte data, samt at username inkluderes i body, kan man ikke poste
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        sessions.add(username);
        res.send('Login succesfuld');
    } else {
        res.status(401).send('Forkert brugernavn eller kode');
    }
});

// Middleware for "beskyttede" endpoints
// Hvis man ikke er logget ind, vil denne middleware sende en 401-statuskode
const authMiddleware = (req, res, next) => {
    const user = req.body.username;
    if (sessions.has(user)) next();
    else res.status(401).send('Ikke logget ind');
};

// Læs fil
// GET-request til /read-file i POSTMAN (husk login!). Så viser den hvad der står i filen data.txt.
app.get('/read-file', authMiddleware, async (req, res) => {
    try {
        const data = await fs.readFile('data.txt', 'utf8');
        res.send(data);
    } catch (err) {
        res.status(500).send('Fejl ved læsning');
    }
});

// Skriv fil
// POST-request til /write-file i POSTMAN med korrekte data (husk login samt at username inkluderes i body). Teksten i data.txt ændres.
app.post('/write-file', authMiddleware, async (req, res) => {
    try {
        await fs.writeFile('data.txt', req.body.content);
        res.send('Fil skrevet!');
    } catch (err) {
        res.status(500).send('Fejl ved skrivning');
    }
});

// Statistik endpoint
app.get('/stats', (req, res) => {
    res.json(endpointStats);
});

// Start server
app.listen(port, () => {
    logger.emit('log', `Server kører på http://localhost:${port}`);
});

/*          Refleksion

Hvorfor bruges async/await i stedet for callbacks?
→ Gør koden mere læsbar og håndterer fejl nemmere med try/catch.

Hvad ville der ske, hvis du fjernede EventEmitteren?
→ Du ville stadig kunne håndtere anmodninger, men du ville miste centraliseret logning.

Hvordan kunne du gøre logging persistent?
→ Brug fs.appendFile til at skrive loggen til en fil eller gem i en database.

Kan denne løsning skaleres til 1000 klienter? Hvorfor/hvorfor ikke?
→ Node.js håndterer mange samtidige forbindelser asynkront, men flaskehalse kan opstå ved CPU-intensive opgaver eller synkrone blokeringer.
 */
