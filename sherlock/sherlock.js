// Liste med navne
const suspects = ["John Watson", "Irene Adler", "Inspector Lestrade", "Professor Moriarty", "Mary Morstan"];

// Flag til at tjekke om mistænkt findes
let found = false;

// Brug en almindelig for-løkke
for (let i = 0; i < suspects.length; i++) {
    if (suspects[i] === "Professor Moriarty") {
        console.log("Mistænkt fundet: Professor Moriarty!");
        found = true;
        break; // Stop med at lede når vi har fundet ham
    }
}

// Bonus: Ingen fundet
if (!found) {
    console.log("Ingen skyldige fundet.");
}

/*
================ REFLEKSION =================

· Hvad er forskellen på en for-løkke og forEach?
  → for-løkke kan brydes med 'break' eller 'continue', forEach kan ikke brydes midt i loopet.
    forEach er mere læsevenlig til simple iterationer, men mindre fleksibel til tidlig exit.

· Hvordan kan du gøre søgningen hurtigere, hvis listen bliver lang?
  → Flere muligheder:
      1) Brug en set eller objekt i stedet for array for O(1) opslag.
      2) Brug Array.find() eller Array.includes() for hurtig søgning.
      3) Sortér listen og brug binært søg (hvis listen er stor og statisk).

=============================================
*/
