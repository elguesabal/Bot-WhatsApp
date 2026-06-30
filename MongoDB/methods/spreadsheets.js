/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR PLANILHAS DA LISTA DE PLANILHAS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String<String>} spreadsheets ARRAY COM NOMES DAS PLANILHAS USADAS
*/
export async function newSpreadsheets(idPhone, spreadsheets) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"googleSheets.pages": spreadsheets
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "newSpreadsheets": ${error}`);
	}
}