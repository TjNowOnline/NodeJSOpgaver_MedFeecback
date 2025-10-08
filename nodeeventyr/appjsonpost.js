const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/data', (req, res) => {
    res.send(`Modtaget data: ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
