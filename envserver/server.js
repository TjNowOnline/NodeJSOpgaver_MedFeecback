// Importer nødvendige moduler
const http = require('http');
require('dotenv').config(); // Load .env

// Hent variabler fra .env
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "ingen nøgle fundet";

// Opret server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Server kører på port: ${PORT}\nDin API-nøgle: ${API_KEY}`);
});

// Start server
server.listen(PORT, () => {
    console.log(`Server kører på port ${PORT}`);
});

/*
================ REFLEKSION =================

· Hvorfor er det en dårlig idé at hardcode adgangsnøgler i sin kode?
  → Hvis koden deles eller kommer på GitHub, kan andre se og misbruge nøglerne. Miljøvariabler holder hemmelige data ude af koden.

· Hvad sker der, hvis .env-filen mangler – hvordan kan du håndtere det sikkert?
  → process.env variabler vil være undefined. Brug fallback-værdier (fx "ingen nøgle fundet") eller tjek med if-sætning og giv en sikker fejlmeddelelse.

=============================================
*/
