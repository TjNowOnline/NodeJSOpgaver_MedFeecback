// logger.js - Logger beskeder med timestamp

function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Gør funktionen tilgængelig udenfor modulet
module.exports = { log };
