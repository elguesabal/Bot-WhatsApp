import FieldMessages from "../receive_message/fields/messages/change.js";

/**
 * @author VAMPETA
 * @brief ROTA PARA INTERPRETAR OS DADOS ENVIADOS PELA API OFICIAL DA META
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
 * @param {Array} req.entry DADOS RECEBIDO DO WHATSAPP
*/
export default async function webhookMessage(req, res) {
	for (const entry of req.entry) {
		for (const change of entry.changes) {
			switch (change.field) {
				case ("messages"):
					FieldMessages(change);
					break;

				case ("message_template_status_update"):
					break;

				case ("account_update"): 
					break;

				case ("phone_number_quality_update"):
					break;

				case ("business_capability_update"):
					break;

				case ("waba_ownership_change"):
					break;

				case ("security"):
					break;

				default:
					console.log("Evento desconhecido:", change.field);
			}
		}
	}
}