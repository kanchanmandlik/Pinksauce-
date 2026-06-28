const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: "postgres",
    user: "postgres",
    password: "postgres",
    database: "recipes",
    port: 5432
});

app.get("/comments", async (req, res) => {

    const result =
        await pool.query(
            "SELECT * FROM comments ORDER BY created_at DESC"
        );

    res.json(result.rows);
});

app.post("/comments", async (req, res) => {

    const { username, comment } = req.body;

    await pool.query(
        "INSERT INTO comments(username, comment) VALUES($1,$2)",
        [username, comment]
    );

    res.json({
        message: "Comment added"
    });
});

app.listen(3000, () => {
    console.log("Server started");
});