import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA CONFIRMAR A LEITURA DA MENSAGEM
 * @param wamid ID DA MENSAGEM QUE VAI SER CONFIRMADA A LEITURA
*/
export default async function readMessage(wamid) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
		},
		data: {
			messaging_product: "whatsapp",
			status: "read",
			message_id: wamid
		}
	});
}