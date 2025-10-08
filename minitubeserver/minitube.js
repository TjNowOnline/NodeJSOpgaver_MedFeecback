// MiniTube-server (HTTP)
// ----------------------

// 1. Importér http-modulet
const http = require("http");

// 2. Opret server
const server = http.createServer((req, res) => {
    // Sæt content-type til tekst
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    // Routing
    if (req.url === "/") {
        res.end("Velkommen til MiniTube");
    } else if (req.url === "/video") {
        res.end("Video afspilles: En episk kattekamp!");
    } else {
        res.statusCode = 404;
        res.end("404 - Siden findes ikke");
    }
});

// 3. Start server på port 3000
server.listen(3000, () => {
    console.log("MiniTube-server kører på http://localhost:3000");
});

/*
================ REFLEKSION =================

· Hvad er forskellen på en route og en filsti?
  → En route er en sti i serverens logik, som bestemmer hvilket svar der sendes tilbage til brugeren.
    En filsti peger derimod på en faktisk fil i filsystemet. Routes handler om hvordan serveren reagerer,
    mens filstier handler om hvor filer fysisk ligger.

· Hvad sker der, hvis du ikke kalder res.end()?
  → Forbindelsen bliver aldrig afsluttet, og browseren vil blive ved med at vente på et svar.
    Serveren “hænger”, og klienten får ikke noget output.

· Hvordan adskiller dette sig fra Java-webservere?
  → I Node.js håndterer man HTTP-anmodninger direkte med callbacks og moduler som http.
    I Java bruger man typisk frameworks (som Spring Boot eller servlets), der abstraherer meget af
    HTTP-håndteringen væk. Node.js er mere lavniveau og event-baseret, mens Java-webservere ofte er mere strukturerede
    og objektorienterede.

=============================================
*/
