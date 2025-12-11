/**
 * @author VAMPETA
 * @brief ROTA USADA PELA API OFICIAL PARA ENCAMINHAR MENSAGENS DE OUTROS USUARIOS PARA O MEU NUMERO
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
 * @returns 200 - MENSAGEM RECEBIDA COM SUCESSO
*/
export default async function webhookMessage(req, res) {
	// console.log("POST consultado: ", req.body.entry[0].changes[0].value.metadata)
	// console.log("POST consultado: ", req.body.entry[0].changes[0].value.contacts)
	// console.log("POST consultado: ", req.body.entry[0].changes[0].value.messages[0].text.body)
	res.sendStatus(200);
	// console.log("rota POST /webhook acessada")
	// console.log("ainda roda codigo")
}