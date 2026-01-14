import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/callback", (req, res) => {
    console.log("TELEGRAM DATA:", req.query); // ✅ REAL DATA AAYEGA
    res.json(req.query);
});

app.listen(3000, () => {
    console.log("Server running");
});
