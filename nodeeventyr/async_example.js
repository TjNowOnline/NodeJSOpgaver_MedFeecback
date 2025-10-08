const fs = require('fs');

console.log('Start reading a file...');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

console.log('End of the script.');
