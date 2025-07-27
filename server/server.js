// import express from 'express';
// import fetch from 'node-fetch';
// import cors from 'cors';
// import path from 'path'; // Required to resolve static file paths
// import { fileURLToPath } from 'url'; // To convert the module URL to file path

// const app = express();
// const port = 3000;

// // Resolve __dirname in ES module scope
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Enable CORS for all incoming requests
// app.use(cors());

// // Serve static files (e.g., images)
// app.use('/img', express.static(path.join(__dirname, 'img')));

// // Proxy endpoint for searching by ICD Code
// app.get('/proxy/code', async (req, res) => {
//     const code = req.query.code; // Get the ICD code from query parameters

//     // Check if code is provided
//     if (!code) {
//         return res.status(400).send('ICD code is required');
//     }

//     // URL of the ICD-10 API for code-based search
//     const apiUrl = `https://smarticd10.health.belgium.be/tabular.php?Version=2025&Code=${code}`;

//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data from ICD-10 API');
//         }

//         const data = await response.text(); // Get the response as HTML
//         res.send(data); // Send the HTML response back to the frontend
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Error fetching data from API');
//     }
// });

// // New Proxy endpoint for Index Search
// app.get('/proxy/index', async (req, res) => {
//     const searchTerm = req.query.Text; // Get the search term from query parameters

//     // Check if searchTerm is provided
//     if (!searchTerm) {
//         return res.status(400).send('Search term is required');
//     }

//     // URL of the Index search API
//     const apiUrl = `https://smarticd10.health.belgium.be/index_title.php?Version=2025&Type=&Text=${encodeURIComponent(searchTerm)}`;
    

//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data from Index API');
//         }

//         const data = await response.text(); // Get the response as HTML
//         res.send(data); // Send the HTML response back to the frontend
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Error fetching data from API');
//     }
// });

// app.listen(port, () => {
//     console.log(`Proxy server running at http://localhost:${port}`);
// });


import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path'; // Required to resolve static file paths
import { fileURLToPath } from 'url'; // To convert the module URL to file path

const app = express();
const port = 3000;

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all incoming requests
app.use(cors());

// Serve static files (e.g., images)
app.use('/img', express.static(path.join(__dirname, 'img')));

// Proxy endpoint for searching by ICD Code
app.get('/proxy/code', async (req, res) => {
    const code = req.query.code; // Get the ICD code from query parameters

    // Check if code is provided
    if (!code) {
        return res.status(400).send('ICD code is required');
    }

    // URL of the ICD-10 API for code-based search
    const apiUrl = `https://smarticd10.health.belgium.be/tabular.php?Version=2025&Code=${code}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from ICD-10 API');
        }

        const data = await response.text(); // Get the response as HTML
        res.send(data); // Send the HTML response back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from API');
    }
});

// New Proxy endpoint for Index Search
app.get('/proxy/index', async (req, res) => {
    const searchTerm = req.query.Text; // Get the search term from query parameters

    // Check if searchTerm is provided
    if (!searchTerm) {
        return res.status(400).send('Search term is required');
    }

    // URL of the Index search API
    const apiUrl = `https://smarticd10.health.belgium.be/index_title.php?Version=2025&Type=&Text=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from Index API');
        }

        const data = await response.text(); // Get the response as HTML
        res.send(data); // Send the HTML response back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from API');
    }
});

// New Proxy endpoint for Level0 (Tabular section)
app.get('/proxy/icd-code', async (req, res) => {
    const level0 = req.query.Level0; // Get the Level0 code from query parameters

    // Check if Level0 is provided
    if (!level0) {
        return res.status(400).send('Level0 code is required');
    }

    // URL for the ICD-10 API using Level0
    const apiUrl = `https://smarticd10.health.belgium.be/index.php?Version=2025&Type=D&Level0=${level0}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from ICD-10 API for Level0');
        }

        const data = await response.text(); // Get the response as HTML
        res.send(data); // Send the HTML response back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from ICD-10 API');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
