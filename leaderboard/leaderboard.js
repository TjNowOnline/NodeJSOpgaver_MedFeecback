const express = require("express");
const app = express();
const PORT = 3000;

// Middleware til at parse JSON
app.use(express.json());

// Array med start-scores
let leaderboard = [
    { name: "Emil", score: 120 },
    { name: "Sofie", score: 95 },
    { name: "Theis", score: 80 },
    { name: "Mia", score: 110 },
    { name: "Jonas", score: 100 }
];

// GET /leaderboard - returnér top 5 som JSON
app.get("/leaderboard", (req, res) => {
    // Sortér descending efter score
    const top5 = leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    res.json(top5);
});

// POST /leaderboard - tilføj ny score
app.post("/leaderboard", (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof score !== "number") {
        return res.status(400).json({ error: "Ugyldigt input" });
    }

    // Simpel cheat-beskyttelse: max score = 500
    if (score > 500) {
        return res.status(400).json({ error: "Score er for høj!" });
    }

    leaderboard.push({ name, score });
    res.json({ message: `${name} fik ${score} point!`, leaderboard });
});

app.listen(PORT, () => {
    console.log(`🏆 Leaderboard-server kører på http://localhost:${PORT}/leaderboard`);
});

/*
Igen for at sende i POSTMAN til /leaderboard i en post mens programmet kører:
{
    "name": "Daniel",
    "score": 150
}
Og send, opdater siden og se hvad der sker.
 */

/*
================ REFLEKSION =================

· Hvad er fordelene ved at sende data som JSON?
  → JSON er standardiseret, let at parse i både frontend og backend, og det er nemt at gemme eller sende videre til andre services.
    Man kan også sende komplekse datastrukturer (arrays, objekter) uden at miste information.

· Hvordan kunne du sikre, at brugeren ikke snyder og sender en score på 9999?
  → Flere muligheder:
      1) Serveren validerer score, f.eks. max-score check (som i eksemplet).
      2) Beregn score på serveren ud fra spillets logik i stedet for at lade klienten sende den.
      3) Brug autentificering og sikre endpoints, så kun legitime spil-sessioner kan sende score.
      4) Krypter eller signér score-data, så klienten ikke kan manipulere det uden serveren opdager det.

=============================================
*/
