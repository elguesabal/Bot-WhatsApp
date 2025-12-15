import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import verifySignature from "./middleware/verify-signature.js";
import response from "./middleware/response.js";
import verifyProductIndicator from "./middleware/verify-product-indicator.js";
import getInfo from "./middleware/get-info.js";

import webhookAuth from "./route/webhook-auth.js";
import webhookMessage from "./route/webhook-message.js";
import message from "./route/message.js";
import home from "./route/home.js";

const app = express();
// app.use(express.json());
app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		}
	})
);

axios.defaults.validateStatus = () => true;
dotenv.config({ quiet: true });

app.get("/webhook", webhookAuth);
app.get("/cancel", webhookAuth);
app.post("/webhook", verifySignature, response, verifyProductIndicator, getInfo, webhookMessage);
app.post("/message", message);
app.get("/home", home);

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
