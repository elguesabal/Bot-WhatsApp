import axios from "axios";

import readMessage from "../../../../send_message/read-message.js";
import sendMessage from "../../../../send_message/send-message.js";
import sendImage from "../../../../send_message/send-image.js";
import sendLocation from "../../../../send_message/send-location.js";
import sendButons from "../../../../send_message/send-buttons.js";
import sendList from "../../../../send_message/send-list.js";
import reactMessage from "../../../../send_message/react-message.js";
import responseMessage from "../../../../send_message/response-message.js";

import { Chat, Message } from "../../../../MongoDB/schema.js";

async function pokeApi(message) {	// CONSULTA A POKEAPI E ENVIA A IMAGEM E STATS DO POKEMON
	const res = await axios({
		method: "GET",
		url: "https://pokeapi.co/api/v2/pokemon/" + message.text.body
	});

	if (res.status !== 200) return (sendMessage(message.from, "Pokemon nao encontrado"));
	const stats = Object.fromEntries(res.data.stats.map((s) => [s.stat.name, s.base_stat]));
	sendImage(message.from, res.data.sprites.front_default, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
}

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
async function text(value, message) {
	console.log("Name:", value.contacts[0]?.profile?.name);
	console.log("Number:", message.from);
	const date = new Date(Number(message.timestamp) * 1000);
	const dia = date.getDate();
	const mes = date.getMonth() + 1;
	const ano = date.getFullYear();
	const hora = date.getHours();
	const minuto = date.getMinutes();
	console.log("Data", `${hora}:${minuto} ${dia}/${mes}/${ano}`);
	console.log("Texto:", message.text.body);
	console.log("\n")
	readMessage(message.id);
	reactMessage(message.from, message.id, "👍");

	// await pokeApi(message);
	// sendMessage(message.from, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
	// sendImage(message.from, res.data.sprites.front_default, `Nome: ${res.data.name}\nHp: ${stats.hp}\nAttck: ${stats.attack}\nDefense: ${stats.defense}\nSpeed: ${stats.speed}`);
	// sendLocation(message.from);
	// sendButons(message.from);	// AINDA NAO CONFIGUREI PARA INTERPRETAR A RESPOSTA DESSE TIPO DE MENSAGEM
	// sendList(message.from);		// AINDA NAO CONFIGUREI PARA INTERPRETAR A RESPOSTA DESSE TIPO DE MENSAGEM

	if (!(await Chat.findOne({ phone: message.from }))) {
		await Chat.create({
			phone: message.from,
			name: undefined,
			lastMessage: {
				text: message.text.body,
				timesTamp: new Date()
			}
		});
console.log("criado")
	} else {
		await Chat.updateOne(
			{
				phone: message.from
			},
			{
				$set: {
					lastMessage: {
						text: message.text.body,
						timesTamp: new Date()
					}
				}
			}
		);
console.log("atualizado")
	}

	await Message.create({
		phone: message.from,
		wamid: message.id,
		type: "text",
		text: message.text.body,
		direction: "inbound",
		timesTamp: new Date()
	});

	const wamid = await sendMessage(message.from, "Mensagem recebida com sucesso!");
	if (wamid) {
		await Chat.updateOne(
			{
				phone: message.from
			},
			{
				$set: {
					lastMessage: {
						text: "Mensagem recebida com sucesso!",
						timesTamp: new Date(),
						status: "sent"
					}
				}
			}
		);
		await Message.create({
			phone: message.from,
			wamid: wamid,
			direction: "outbound",
			timesTamp: new Date(),
			status: "sent",
			type: "text",
			text: "Mensagem recebida com sucesso!"
		});
	}
}

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "sticker"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
function sticker(value, message) {
	console.log("chegou figurinha");
}

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
function interactive(value, message) {
	responseMessage(message.id, message.from, `Opção selecionada: ${message.interactive[message.interactive.type].title}`);
}

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "messages" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
*/
export default async function messages(value) {
	for (const message of value.messages) {
		switch (message.type) {
			case ("text"):
				await text(value, message);
				break;

			// case ("sticker"):
			// 	console.log(value)
			// 	sticker(value, message);
			// 	break;

			case ("interactive"):
				interactive(value, message);
				break;

			default:
				console.log("type nao suportado:", message.type);
				sendMessage(message.from, "No momento o meu servidor nao suporta esse tipo de mensagem");
		}
	}
}

// text					messages[n].text.body
// image				messages[n].image
// video				messages[n].video
// audio				messages[n].audio
// document				messages[n].document
// sticker				messages[n].sticker
// location				messages[n].location
// contacts				messages[n].contacts[]
// interactive			messages[n].interactive
// button				messages[n].button
// reaction				messages[n].reaction
// ephemeral			messages[n].ephemeral