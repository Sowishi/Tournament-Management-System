// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000; // Port for the backend server
const corsOption = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOption)); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Define an endpoint to create a tournament
app.post("/create-tournament", async (req, res) => {
  const { tournamentName, tournamentType, description } = req.body;

  try {
    const response = await fetch(
      "https://api.challonge.com/v1/tournaments.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "RloHpyQkc1CVVlZvv48DtBqq16d8XTAYUhNVLau7",
          tournament: {
            name: tournamentName,
            tournament_type: tournamentType,
            description: description,
          },
        }),
      }
    );

    if (!response.ok) {
      // If the response status is not OK, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const output = await response.json();

    // Send success response
    res.json({
      message: "Tournament created successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating tournament:", error);

    // Send error response
    res.status(500).json({
      message: "Error creating tournament",
      error: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
