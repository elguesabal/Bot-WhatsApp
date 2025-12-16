import messages from "./messages/messages.js";
import statuses from "./statuses/statuses.js";

// function messaging_product() {

// }

// function metadata() {

// }

// function contacts() {

// }

// messages MOVIDO

// statuses MOVIDO

// function errors() {

// }

/**
 * @author VAMPETA
 * @brief ENCAMINHA PARA A FUNCAO QUE TRATA CORRETAMENTE CADA CAMPO EXISTENTE
 * @param {Object} change UMA DAS POSICOES DO CAMPO req.body.entry[n].changes[n]
*/
export default function FieldMessages(change) {
	if (change.value.messaging_product) {}
	if (change.value.metadata) {}
	if (change.value.contacts) {}
	if (change.value.messages) messages(change.value);
	if (change.value.statuses) statuses(change.value);
	if (change.value.errors) {}
}