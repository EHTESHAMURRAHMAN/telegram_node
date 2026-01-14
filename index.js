import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Telegram OAuth callback route
app.get("/callback", (req, res) => {
    // Take all query parameters sent by Telegram
    const data = { ...req.query };

    // Return all data directly, skip hash verification
    return res.json({
        id: data.id || null,
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        username: data.username || null,
        photo_url: data.photo_url || null,
        auth_date: data.auth_date || null,
        ...data, // include any extra parameters Telegram sent
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Telegram OAuth server running on port ${PORT} (no hash verification)`);
});
