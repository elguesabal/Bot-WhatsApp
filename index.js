import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

axios.defaults.validateStatus = () => true;
dotenv.config({ quiet: true });

app.get("/message", async (req, res) => {
	const response = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
		},
		data: {
			messaging_product: "whatsapp",
			to: process.env.MY_NUMBER,
			type: "text",
			text: {
				body: "ala teu pai"
			}
		}
	});

	if (response.status === 200) return (console.log(response.data), res.sendStatus(200));
	console.log(response.status, "\n\n", response.data);
	res.status(response.status).send(response.data);
});

app.get("/webhook", (req, res) => {
	console.log("GET consultado")
	return res.status(200).send(req.query["hub.challenge"]);
});

app.post("/webhook", (req, res) => {
	// console.log("POST consultado: ", req.body.entry[0].changes[0].value.metadata)
	// console.log("POST consultado: ", req.body.entry[0].changes[0].value.contacts)
	console.log("POST consultado: ", req.body.entry[0].changes[0].value.messages[0].text.body)
	res.sendStatus(200);
	// console.log("ainda roda codigo")
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));