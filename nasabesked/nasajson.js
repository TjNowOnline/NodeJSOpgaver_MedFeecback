// Send data til rummet (POST med Express)
// ---------------------------------------

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware til at kunne læse JSON-data fra POST-body
app.use(express.json());

// Route til at modtage data
app.post("/send", (req, res) => {
    const { pilot, planet } = req.body;

    if (!pilot || !planet) {
        // Hvis brugeren ikke sender korrekt JSON
        return res
            .status(400)
            .json({ error: "Fejl: Du skal sende både pilot og planet i JSON-format." });
    }

    const message = `Pilot ${pilot} landede sikkert på ${planet}.`;
    res.json({ message });
});

// Start serveren
app.listen(PORT, () => {
    console.log(`🚀 Rumserver kører på http://localhost:${PORT}/send`);
});

/*
For at det virker, kør programmet, åben POSTMAN og sende en POST-request til http://localhost:3000/send med en gyldig "pilot" og "planet" i JSON-format.
 */

/*
================ REFLEKSION =================

· Hvad sker der, hvis brugeren sender et tomt JSON-objekt?
  → Så findes 'pilot' og 'planet' ikke i req.body, og serveren returnerer en fejlmeddelelse
    (status 400). Det viser, at serveren kræver specifikke data for at kunne danne et svar.

· Hvad kan fordelen være ved at bruge POST frem for GET her?
  → POST bruges til at sende data til serveren, som f.eks. formularer eller JSON-objekter.
    GET er derimod beregnet til at hente data via URL’en.
    Med POST bliver data ikke vist i URL’en, og man kan sende mere komplekse og sikre data.

=============================================
*/
