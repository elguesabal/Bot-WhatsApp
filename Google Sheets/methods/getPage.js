import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA E TRANFORMA EM JSON
 * @param {String} idPhone ID DO CLIENTE
 * @param {String} idSpreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
 * @return {Array<Object>} RETORNA UM OBJETO COM O CONTEUDO DE page NO FORMATO JSON
*/
export async function getPageJson(idPhone, idSpreadsheet, page) {
	try {
		const res = await this.googleSheets.spreadsheets.values.get({
			spreadsheetId: idSpreadsheet,
			range: page
		});
		if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ([]);
		const [headers, ...data] = res.data.values;
		const array = [];

		for (const line of data) {
			const obj = {};
			line.forEach((element, i) => (headers[i] && element) ? obj[headers[i]] = element : null);
			array.push(obj);
		}
		return (array);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "getPageJson": ${error}`);
		return (null);
	}
}

/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA E TRANFORMA EM JSON E DEPOIS CONVERTE EM TEXTO
 * @param {String} idPhone ID DO CLIENTE
 * @param {String} idSpreadsheet ID DA PLANILHA
 * @param {Array<String>} pages NOMES DAS PLANILHAS QUE DEVEM SER CONSULTADAS
 * @return {String} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
export async function getPageJsonText(idPhone, spreadsheet, pages) {
	try {
		let text = "";
		const availablePages = await this.getPages(idPhone, spreadsheet);

		if (availablePages === null) return (null);
		for (const page of pages) {
			if (!availablePages.includes(page)) continue;
			const table = await this.getPageJson(idPhone, spreadsheet, page);
			text += (table.length) ? `\n${JSON.stringify(table)}` : "";
		}
		return (text);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "getPageJsonText": ${error}`);
		return (null);
	}
}

/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
 * @return {String} RETORNA UM OBJETO COM O CONTEUDO DE page
*/
export async function getPageTable(account, page) {
	try {
		const res = await this.googleSheets.spreadsheets.values.get({
			spreadsheetId: account.googleSheets.spreadsheet,
			range: page
		});
		if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ("");
		const [headers, ...data] = res.data.values;
		let text = "";
		for (const line of data) {
			line.forEach((element, i) => text += (headers[i] && element) ? `${headers[i]}: ${element}\n` : "");
			text += "\n";
		}
		return (text);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "getPageTable": ${error}`);
		return ("");
	}
}