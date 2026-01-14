import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(cors());

const BOT_TOKEN = "8504673170:AAFlRCSa6AAbPO8AcGKw8iDUgLXGlSoqPnM";

app.get("/callback", (req, res) => {
    const data = { ...req.query };
    const hash = data.hash;
    delete data.hash;

    const secret = crypto.createHash("sha256").update(BOT_TOKEN).digest();
    const checkString = Object.keys(data)
        .sort()
        .map((k) => `${k}=${data[k]}`)
        .join("\n");
    const hmac = crypto.createHmac("sha256", secret).update(checkString).digest("hex");

    if (hmac !== hash) {
        return res.status(401).send("Invalid Telegram login");
    }

    // Return JSON wrapped in <pre> for WebView
    return res.send(`<pre>${JSON.stringify(data)}</pre>`);
});


app.listen(3000, () => {
    console.log("new hosted 3000");
});
