/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O ESTADO SE O BOT ESTA LIGADO PARA AQUELE CHAT OU NAO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NOVO CONTATO QUE MANDOU MENSAGEM
 * @param {Boolean} stateBot NOVO ESTADO DO BOT SE ELE ESTA LIGADO OU NAO
*/
export async function saveStateBot(idPhone, phone, stateBot) {
	try {
		const res = await this.Contact.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					bot: stateBot
				}
			}
		);

		if (res.matchedCount === 0) return ("NOT_FOUND");
		if (res.modifiedCount === 0) return ("ALREADY_UPDATED");
		return ("UPDATED");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveStateBot": ${error}`);
		return ("ERROR");
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O ESTADO SE O BOT ESTA LIGADO PARA TODOS OS CONTATOS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Boolean} stateBot NOVO ESTADO DO BOT SE ELE ESTA LIGADO OU NAO
*/
export async function updateStateBot(idPhone, stateBot) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.activated": stateBot
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "updateStateBot": ${error}`);
	}
}