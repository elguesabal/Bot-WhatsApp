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

app.get("/webhook", webhookAuth);
app.get("/cancel", webhookAuth);
app.post("/webhook", verifySignature, response, verifyProductIndicator, webhookMessage);
app.post("/message", message);
app.get("/home", home);

import { Message } from "./MongoDB/schema.js";
app.get("/chat", async (req, res) => {
	const { phone } = req.query;

	if (!phone) return (res.sendStatus(400));
	const chat = await Message.find({ phone: phone });
	if (!chat) return (res.sendStatus(404));
	console.log(chat)
	// let messages = [];
	let messages = "";
	for (const message of chat) {
		// messages.push(message.text);
		messages += `<p style="width:100%; margin:0; text-align:${(message.direction === "inbound") ? "left" : "right"};">${message.text}</p>`;
	}
	res.status(200).send(messages);
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
