import fetch from 'node-fetch';  // Importing the fetch module
import sqlite3 from 'sqlite3';  // Importing sqlite3 module

// Create a new SQLite database (or open the existing one)
const db = new sqlite3.Database('./icd10_data.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS icd10_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    }
});

// Function to fetch data from the API
async function fetchData() {
    // URL of the API you're fetching data from
    const apiUrl = 'https://smarticd10.health.belgium.be/index_title.php?Version=2025&Type=&Text=fever';

    try {
        const response = await fetch(apiUrl);
        
        // If the response is not okay, throw an error
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Assuming the API returns text (HTML or JSON)
        const data = await response.text(); // Use .json() if API returns JSON

        console.log('Fetched Data:', data); // Log the fetched data to see the result

        // Save the fetched data into the SQLite database
        saveToDatabase(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to save data into the SQLite database
function saveToDatabase(data) {
    const stmt = db.prepare('INSERT INTO icd10_data (data) VALUES (?)');
    
    stmt.run(data, function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data saved to the database with ID:', this.lastID);
        }
    });

    stmt.finalize();  // Finalize the statement after execution
}

// Start the process by calling fetchData
fetchData();
