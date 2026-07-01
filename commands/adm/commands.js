import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

import { help } from "./help.js";
import { all_messages, reaction, text, sticker, audio, image, video, location, contacts, document, button, list /*, template */ } from "./messages.js";

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DE ADM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function commandsAdm(account, message) {
	try {
		const command = message.text.body.split(" ");

		switch (command[0]) {
			case "/ajuda":
				await help(account, message);
				break;

			case "/todas_mensagens":
				await all_messages(account, message);
				break;

			case "/reaction":
				await reaction(account, message);
				break;

			case "/text":
				await text(account, message);
				break;

			case "/sticker":
				await sticker(account, message);
				break;

			case "/audio":
				await audio(account, message);
				break;

			case "/image":
				await image(account, message);
				break;

			case "/video":
				await video(account, message);
				break;

			case "/location":
				await location(account, message);
				break;

			case "/contacts":
				await contacts(account, message);
				break;

			case "/document":
				await document(account, message);
				break;

			case "/button":
				await button(account, message);
				break;

			case "/list":
				await list(account, message);
				break;

			// case "/template":	// DESABILITADO PARA NAO GERAR COBRANCAS
			// 	await template(account, message);
			// 	break;

			default:
				await send.text(account, message.from, { text: { body: "Comando não encontrado. Digite `/ajuda` para ver os comandos disponíveis." } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsAdm": ${error}`);
	}
}