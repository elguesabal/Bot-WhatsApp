import axios from "axios";

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
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
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

	// if (res.status === 200) console.log("mensagem enviada");
	// if (res.status !== 200) console.log(res.status, "\n\n", res.data);
	return (res);
}