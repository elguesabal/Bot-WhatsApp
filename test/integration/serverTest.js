import configDotenv from "../../configs/dotenv.js";
import connectMongoDB from "../../configs/mongodb.js";
import connectCloudflareR2 from "../../configs/cloudflare r2.js";
import connectGoogleSheets from "../../configs/google sheets.js";
import connectIA from "../../configs/IA.js";

import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO PRINCIPAL QUE INICIAL O SERVIDOR PARA TESTES UNIT
*/
async function start() {
	configDotenv();
	if (this.config.mongoDB) await connectMongoDB();
	if (this.config.cloudFlareR2) await connectCloudflareR2();
	if (this.config.googleSheets) await connectGoogleSheets();
	if (this.config.IA) await connectIA();
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE FECHA O SERVIDOR DE TESTES E2E
*/
async function stop() {
	if (this.config.mongoDB) await mongodb.mongodb.connection.close();
}

/**
 * @author VAMPETA
 * @brief CLASSE QUE CONTROLA O ESTADO DO SERVIDOR DE TESTE E2E
*/
export default class Server {
	constructor({ mongoDB = false, cloudFlareR2 = false, googleSheets = false, IA = false }) {
		this.config = {
			mongoDB: mongoDB,
			cloudFlareR2: cloudFlareR2,
			googleSheets: googleSheets,
			IA: IA
		};

		this.start = start.bind(this);
		this.stop = stop.bind(this);
	}
}