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

	if (response.status === 200) return (res.sendStatus(200));
	console.log(response.status, "\n\n", response.data);
	res.status(response.status).send(response.data);
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));