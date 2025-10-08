// Terninge-API (HTTP)
// ---------------------

const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.url === "/roll") {
        // Antal sider på terningen – nemt at ændre senere
        const sides = 6;
        const roll = Math.floor(Math.random() * sides) + 1;

        let message = `Du slog ${roll}`;
        if (roll === 6) {
            message = "Du vandt!";
        }

        // Svar som JSON
        const response = {
            roll: roll,
            message: message,
        };

        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "404 - Siden findes ikke" }));
    }
});

server.listen(3000, () => {
    console.log("Terninge-API kører på http://localhost:3000/roll");
});

/*
================ REFLEKSION =================

· Hvad er JSON?
  → JSON (JavaScript Object Notation) er et format til at udveksle data mellem systemer.
    Det er tekstbaseret, letlæseligt og bruges meget til API’er, fordi det ligner JavaScript-objekter.

· Er serverens svar forskelligt hver gang? Hvorfor?
  → Ja, fordi Math.random() genererer et nyt tilfældigt tal hver gang man kalder /roll.

· Hvordan kan du gøre det nemt at ændre antallet af sider på terningen senere?
  → Ved at gemme antallet af sider i en variabel (f.eks. const sides = 6).
    Så skal man kun ændre det ét sted, hvis man vil have en 20-sidet terning.

=============================================
*/
