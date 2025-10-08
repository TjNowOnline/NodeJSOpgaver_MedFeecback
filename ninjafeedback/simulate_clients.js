const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const users = [
    { username: 'admin', password: '1234' },
    { username: 'admin', password: '1234' },
    { username: 'admin', password: '1234' },
    { username: 'admin', password: '1234' },
    { username: 'admin', password: '1234' },
];

const runClient = async (i) => {
    try {
        // 1️⃣ Login
        await axios.post(`${BASE_URL}/login`, users[i - 1]);
        console.log(`Client ${i}: Login succesfuld`);

        // 2️⃣ Skriv fil
        await axios.post(`${BASE_URL}/write-file`, {
            username: 'admin',
            content: `Ny content fra client ${i}`
        });
        console.log(`Client ${i}: Fil skrevet`);

        // 3️⃣ Læs fil
        const res = await axios.get(`${BASE_URL}/read-file`, { data: { username: 'admin' } });
        console.log(`Client ${i}: Fil indhold: "${res.data}"`);

        // 4️⃣ Hent statistik
        const stats = await axios.get(`${BASE_URL}/stats`);
        console.log(`Client ${i}: Endpoint stats`, stats.data);

    } catch (err) {
        console.error(`Client ${i} fejl:`, err.message);
    }
};

// Kør 5 samtidige klienter
for (let i = 1; i <= 5; i++) {
    runClient(i);
}
