import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import connectMongoDB from "./MongoDB/connect.js";

import verifySignature from "./middleware/verify-signature.js";
import response from "./middleware/response.js";
import verifyProductIndicator from "./middleware/verify-product-indicator.js";

import webhookAuth from "./route/webhook-auth.js";
import webhookMessage from "./route/webhook-message.js";
import message from "./route/message.js";
import home from "./route/home.js";

const app = express();
app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		}
	})
);

axios.defaults.validateStatus = () => true;
dotenv.config({ quiet: true });

connectMongoDB();
import teste from "./MongoDB/schema.js";
teste();

app.get("/webhook", webhookAuth);
app.get("/cancel", webhookAuth);
app.post("/webhook", verifySignature, response, verifyProductIndicator, webhookMessage);
app.post("/message", message);
app.get("/home", home);

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
