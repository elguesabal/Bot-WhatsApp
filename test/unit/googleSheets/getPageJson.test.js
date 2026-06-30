import Server from "../serverTest.js";

import googleSheets from "../../../Google Sheets/GoogleSheets.js";

/**
 * @author VAMPETA
 * @brief TESTA O METODO 'getPageJson' DA CLASSE GoogleSheets
*/
describe("Google Sheets - getPageJson", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
	});

	afterAll(async () => {
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await googleSheets.getPageJson();

		// expect(res).toMatchObject({
		// 	teste: 42
		// });
	});
});