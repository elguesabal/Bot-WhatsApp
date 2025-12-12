import sendMessage from "../functions/send-message.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE VERIFICA O TIPO DA REQUISICAO
 * @param body CONTEUDO RECEBIDO NO CORPO DA REQUISICAO
*/
function verification(body) {
	const type = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type;

	if (type === "text") return ("text");
	return ("error");
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE EXTRAI ALGUMAS INFORMACOES DO CORPO DA REQUISICAO
 * @param body CONTEUDO RECEBIDO NO CORPO DA REQUISICAO
*/
function getInfo(body) {
	console.dir(body, { depth: null });
	const info = {
		id: body.entry[0].changes[0].value.messages[0].id,
		number: body.entry[0].changes[0].value.messages[0].from,
		type: body.entry[0].changes[0].value.messages[0].type,
		text: body.entry[0].changes[0].value.messages[0].text.body,
		date: new Date(Number(body.entry[0].changes[0].value.messages[0].timestamp) * 1000)
	};

	return (info);
}

/**
 * @author VAMPETA
 * @brief ROTA USADA PELA API OFICIAL PARA ENCAMINHAR MENSAGENS DE OUTROS USUARIOS PARA O MEU NUMERO
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
 * @returns 200 - MENSAGEM RECEBIDA COM SUCESSO
*/
export default async function webhookMessage(req, res) {
	res.sendStatus(200);
	if (verification(req.body) === "error") {
		// sendMessage();
		return ;
	}
	const info = getInfo(req.body);

	// console.log(info);
	// getInfo(req.body);
	// console.log(((await sendMessage(info.number, "mnesagem recebida")).status === 200) ? "Mensagem respondida" : "Error");
	if (info.number === process.env.MY_NUMBER) return (await sendMessage(info.number, "Vai fazendo o monumento de angulacao de 90°"));
	if (info.number === process.env.MAYTTE) return (await sendMessage(info.number, "Oi amor da minha vida"));
	if (info.number === process.env.NATAN) return (await sendMessage(info.number, "Koe Natan, e o aplicavo? nada ainda?"));
	await sendMessage(info.number, "Mensagem recebida");
}