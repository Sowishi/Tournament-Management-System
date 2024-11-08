// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000; // Port for the backend server
const allowedOrigins = [
  "http://localhost:5173",
  "https://tournament-772d1.web.app",
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tournament-772d1.web.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

//Participants
app.get("/get-participants", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}/participants.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const tournaments = await response.json();
    res.json({
      message: "Participants fetched successfully",
      data: tournaments,
    });
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({
      message: "Error fetching participants",
      error: error.message,
    });
  }
});

app.get("/show-participant", async (req, res) => {
  const { tourID, userID } = req.query;

  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${tourID}/participants/${userID}.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const tournaments = await response.json();
    res.json({
      message: "Participants fetched successfully",
      data: tournaments,
    });
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({
      message: "Error fetching participants",
      error: error.message,
    });
  }
});

app.post("/add-participant", async (req, res) => {
  const { users, id } = req.body;
  const names = users
    .filter((user) => user.username)
    .map((user) => {
      return { name: user.collegeName };
    });
  console.log(id, names);
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}/participants/bulk_add.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: names,
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
      message: "Participants Added successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error adding participants:", error);

    // Send error response
    res.status(500).json({
      message: "Error adding participants",
      error: error.message,
    });
  }
});

app.delete("/delete-participant", async (req, res) => {
  const { tourID, userID } = req.body;
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${tourID}/participants/${userID}.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // If the response status is not OK, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const output = await response.json();

    // Send success response
    res.json({
      message: "Participants deleted successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting participants:", error);

    // Send error response
    res.status(500).json({
      message: "Error deleting participants",
      error: error.message,
    });
  }
});

//Tournament
app.get("/get-tournaments", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.challonge.com/v1/tournaments.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const tournaments = await response.json();

    // Send the fetched tournaments data to the client
    res.json({
      message: "Tournaments fetched successfully",
      data: tournaments,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching tournaments:", error);

    // Send error response
    res.status(500).json({
      message: "Error fetching tournaments",
      error: error.message,
    });
  }
});

app.post("/create-tournament", async (req, res) => {
  const { tournamentName, tournamentType, tournamentEvent, startAt } = req.body;

  try {
    const response = await fetch(
      "https://api.challonge.com/v1/tournaments.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M",
          tournament: {
            name: tournamentName,
            tournament_type: tournamentType,
            description: tournamentEvent,
            show_rounds: true,
            review_before_finalizing: false,
            ranked_by: "match wins",
            start_at: startAt,
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

app.get("/show-tournament", async (req, res) => {
  const id = req.query.id;

  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`
    );

    if (!response.ok) {
      // If the response status is not OK, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const output = await response.json();
    // Send success response
    res.json({
      message: "Tournament fetch successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching tournament:", error);

    // Send error response
    res.status(500).json({
      message: "Error fetching tournament",
      error: error.message,
    });
  }
});

app.post("/start-tournament", async (req, res) => {
  const id = req.query.id;

  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}/start.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const output = await response.json();
    // Send success response
    res.json({
      message: "Tournament started successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error starting tournament:", error);

    // Send error response
    res.status(500).json({
      message: "Error starting tournament",
      error: error.message,
    });
  }
});

app.post("/finalize-tournament", async (req, res) => {
  const id = req.query.id;

  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}/finalize.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const output = await response.json();
    // Send success response
    res.json({
      message: "Tournament finalize successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error finalizing tournament:", error);

    // Send error response
    res.status(500).json({
      message: "Error finalizing tournament",
      error: error.message,
    });
  }
});

app.delete("/delete-tournament", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      // If the response status is not OK, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const output = await response.json();
    // Send success response
    res.json({
      message: "Tournament deleted successfully",
      data: output,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting tournament:", error);
    // Send error response
    res.status(500).json({
      message: "Error deleting tournament",
      error: error.message,
    });
  }
});

//Matches
app.get("/get-matches", async (req, res) => {
  const id = req.query.id;
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${id}/matches.json?api_key=UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const matches = await response.json();
    // Send the fetched matches data to the client
    res.json({
      message: "matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching matches:", error);
    // Send error response
    res.status(500).json({
      message: "Error fetching matches",
      error: error.message,
    });
  }
});

app.put("/update-match-winner", async (req, res) => {
  const { tourID, winnerID, matchID } = req.query;

  const data = {
    api_key: "UeuI5bUZKaMwWFf1TEsnJTj1VhQ2EWdvQ5KZ8g5M",
    match: {
      scores_csv: "1-0",
      winner_id: winnerID,
    },
  };
  try {
    const response = await fetch(
      `https://api.challonge.com/v1/tournaments/${tourID}/matches/${matchID}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const matches = await response.json();
    console.log(matches);
    // Send the fetched matches data to the client
    res.json({
      message: "matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching matches:", error);
    // Send error response
    res.status(500).json({
      message: "Error fetching matches",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
