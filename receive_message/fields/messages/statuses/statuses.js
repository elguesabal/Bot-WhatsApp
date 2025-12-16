export default function statuses(value) {
	for (const status of value.statuses) {
		switch (status.status) {
			case ("sent"):
				console.log(value.metadata.display_phone_number, "Mensagem entregue e aceita pela meta");
				break;

			case ("delivered"):
				console.log(value.metadata.display_phone_number, "Mensagem entregue ao destinatario");
				break;

			case ("read"):
				console.log(value.metadata.display_phone_number, "Mensagem lida pelo destinatario")
				break;

			case ("failed"):
				console.log("Mensagem ano aceita pela meta ou falhou", status.errors);
				break;
		}
	}
}