const fs = require('fs');

fs.writeFile('output.txt', 'Dette er noget data', (err) => {
    if (err) throw err;
    fs.readFile('output.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
});
