import Server from "../serverTest.js";

import googleSheets from "../../../Google Sheets/GoogleSheets.js";

/**
 * @author VAMPETA
 * @brief TESTA O METODO 'getPages' DA CLASSE GoogleSheets
*/
describe("Google Sheets - getPages", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.ID_SPREADSHEET_TEST) throw (new Error("ID_SPREADSHEET_TEST não configurado"));
	});

	afterAll(async () => {
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST);

		expect(res).toMatchObject(expect.any(Array));
	});

	test("requisição feita sem parâmetros", async () => {
		const res = await googleSheets.getPages();

		expect(res).toEqual(null);
	});
});