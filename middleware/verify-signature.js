import crypto from "crypto";

/**
 * @author VAMPETA
 * @brief MIDDLEWARE DE CONFIRMACAO DA ORIGEM DA REQUISICAO
 * @method POST
 * @route /webhook
 * @returns 403 - x-hub-signature INVALIDO (TAMBEM ACONTECER CASO O BODY ESTEJA VAZIO)
*/
export default function verifySignature(req, res, next) {
	const signature = req.headers["x-hub-signature-256"];
	if (!signature || !req.rawBody || req.rawBody.length === 0) return (res.sendStatus(403));
	const expected = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(req.rawBody).digest("hex");
	const sigBuffer = Buffer.from(signature);
	const expBuffer = Buffer.from(expected);
	if (sigBuffer.length !== expBuffer.length) return (res.sendStatus(403));
	if (!crypto.timingSafeEqual(sigBuffer, expBuffer)) return (res.sendStatus(403));
	next();
}