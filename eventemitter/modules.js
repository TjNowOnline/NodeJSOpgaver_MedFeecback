// Henter koden fra math.js i undermappe
const { add } = require('./math/math');
// Vælger talene og udskriver resultatet
const result = add(5, 7);
console.log("Resultatet af 5 + 7 er: " + result);

// Indsætter et array med tal og udskriver de tal der er over 5
let tal = [5, 2, 8];
// Filter er en indbygget metode i JavaScript
// Dette filter vil filtrere tal der er over 5
const overFem = tal.filter(n => n > 5);
overFem.forEach(n => console.log(n));