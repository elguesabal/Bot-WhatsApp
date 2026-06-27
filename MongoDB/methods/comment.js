/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O COMENTARIO DO CONTATO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} contact NUMERO DE CONTATO
 * @param {String} text COMENTARIO QUE SERA SALVO
*/
export async function saveComment(idPhone, contact, text) {
	try {
		const res = await this.Contact.updateOne(
			{
				idPhone: idPhone,
				phone: contact
			},
			{
				comment: text
			}
		);

		if (res.matchedCount === 0) return ("NOT_FOUND");
		if (res.modifiedCount === 0) return ("ALREADY_UPDATED");
		return ("UPDATED");
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveComment": ${error}`);
		return ("ERROR");
	}
}