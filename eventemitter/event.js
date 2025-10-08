const EventEmitter = require('events'); // Vi importerer systemet
const event = new EventEmitter(); // Vi laver en ny \"event-maskine\"
// Vi fortæller: \"Når eventen 'hej' sker, så gør dette:\"
event.on('hej', () => {
    console.log('💀');
});
// Vi udløser eventen:
event.emit('hej');
// For at eventet kører 2 gange bruger vi "emit" igen.
event.emit('hej');
