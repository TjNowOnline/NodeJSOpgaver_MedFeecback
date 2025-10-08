// Hovedprogrammet

const { log } = require("./utils/logger");
const { add } = require("./utils/math");

// Brug logger
log("Programmet starter.");

// Brug math
const sum = add(5, 7);
log(`5 + 7 = ${sum}`);

// Test ekstra log
log("Programmet slutter.");

/*
· Hvorfor er det en god idé at splitte funktioner op i moduler?
  → Det gør koden mere overskuelig, genbrugelig og nemmere at vedligeholde.
    Man kan isolere funktionalitet og undgå at få én kæmpe fil med alt.

· Hvad sker der, hvis to moduler har funktioner med samme navn?
  → Det er ikke et problem, så længe de importeres med de navne, man selv vælger.
    F.eks. kan man gøre:
    const { log: loggerLog } = require("./utils/logger");
const { log: mathLog } = require("./utils/math");
så undgår man navnekonflikter.
 */
