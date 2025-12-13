import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import webhookAuth from "./route/webhook-auth.js";
import webhookMessage from "./route/webhook-message.js";
import message from "./route/message.js";
import home from "./route/home.js";

const app = express();
app.use(express.json());

axios.defaults.validateStatus = () => true;
dotenv.config({ quiet: true });

app.get("/webhook", webhookAuth);
app.post("/webhook", webhookMessage);
app.post("/message", message);
app.get("/home", home);
app.get("/cancel", webhookAuth);

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
