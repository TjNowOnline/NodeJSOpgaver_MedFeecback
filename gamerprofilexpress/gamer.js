// Gamerprofil med Express og parametre
// -------------------------------------

const express = require("express");
const app = express();
const PORT = 3000;

// Eksempel på hardcodet “database” af spillere
const gamers = {
    daniel: "Hades II",
    tino: "Femboy FUTA HOUSE",
    theis: "Helldivers",
    møller: "CS:GO",
    casper: "Tisser"
};

// Route med parameter
app.get("/gamer/:name", (req, res) => {
    const name = req.params.name.toLowerCase();

    // Tjek om spilleren findes
    if (gamers[name]) {
        res.send(`${name.charAt(0).toUpperCase() + name.slice(1)} spiller ${gamers[name]}.`);
    } else {
        res.status(404).send(`Spilleren '${name}' blev ikke fundet i databasen.`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🎮 Gamerprofil-server kører på http://localhost:${PORT}/gamer/emil`);
});

/*
================ REFLEKSION =================

· Hvordan kan man sikre, at brugeren ikke skriver upassende navne?
  → Man kan filtrere inputtet, f.eks. tjekke for forbudte ord, bruge regex-validering,
    eller have en whitelist over tilladte navne.
    Alternativt kan man håndtere det i frontend, så brugeren slet ikke kan indtaste dem.

· Hvordan ville du håndtere en database med tusindvis af spillere i stedet for hardcodning?
  → I stedet for et JavaScript-objekt ville jeg oprette en database (fx MySQL, MongoDB eller SQLite),
    og lave en forespørgsel som:
      "SELECT game FROM gamers WHERE name = ?"
    på serveren. Det gør det skalerbart og lettere at opdatere, søge og administrere mange brugere.

=============================================
*/
