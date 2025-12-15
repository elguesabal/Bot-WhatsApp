import sendMessage from "../send-message.js";

// function messaging_product() {

// }

// function metadata() {

// }

// function contacts() {

// }

function messages(value) {
	for (const message of value.messages) {
		switch (message.type) {
			case ("text"):
				console.log("chegou essa mensagem:", message.text.body);
				if (message.from === process.env.MY_NUMBER && message.text.body === "koe") sendMessage(message.from, "quale mane");
				break;

			default:
				console.log("type desconhecido:", message.type);
		}
	}
}

// function statuses() {

// }

// function errors() {

// }

export default function FieldMessages(change) {
	// const message = change.value.messages[0].text.body;
	// console.log("mensagem q chegou: ", message);
	// const { messaging_product, metadata, contacts, messages, statuses, errors } = change;

	if (change.value.messaging_product) {}
	if (change.value.metadata) {}
	if (change.value.contacts) {}
	if (change.value.messages) messages(change.value);
	if (change.value.statuses) {}
	if (change.value.errors) {}
}