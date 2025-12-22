import axios from "axios";
import { Chat, Message } from "../MongoDB/schema.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR MENSAGENS SIMPLES
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export default async function sendMessage(number, message) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN
		},
		data: {
			messaging_product: "whatsapp",
			to: number,
			type: "text",
			text: {
				body: message
			}
		}
	});



	if (!(await Chat.findOne({ phone: number }))) {
		await Chat.create({
			phone: number,
			name: undefined,
			lastMessage: {
				text: message,
				timesTamp: new Date()
			}
		});
		console.log("criado")
	} else {
		await Chat.updateOne(
			{
				phone: number
			},
			{
				lastMessage: {
					text: message,
					timesTamp: new Date()
				}
			}
		);
		await Message.create({
			phone: number,
			// iDMessage: {
			// 	type: Number,
			// 	require: true
			// },
			wamid: res.id,
			type: "text",
			text: message,
			direction: "outbound"
		});
		console.log("atualizado")
	}



	return (res);
}