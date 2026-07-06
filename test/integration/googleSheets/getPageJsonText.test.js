import Server from "../serverTest.js";
import googleSheets from "../../../Google Sheets/GoogleSheets.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TESTA O METODO 'getPageJsonText' DA CLASSE GoogleSheets
*/
describe("Google Sheets - getPageJsonText", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });
	let pages;

	beforeAll(async () => {
		await server.start();
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.ID_SPREADSHEET_TEST) throw (new Error("ID_SPREADSHEET_TEST não configurado"));
		const account = await mongodb.Account.findOne({ idPhone: process.env.ID_PHONE_TEST }).select("googleSheets.pages -_id").lean();
		pages = account.googleSheets.pages;
	});

	afterAll(async () => {
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição feita com 'idPhone' inválido (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText("id inválido", process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição feita com 'idSpreadsheet' inexistente", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, "planilha inexistente", pages);

		expect(res).toBeNull();
	});

	test("requisição feita com 'idPhone' inválido, 'idSpreadsheet' inexistente e 'page' inexistente", async () => {
		const res = await googleSheets.getPageJsonText("id inválido", "planilha inexistente", "página inexistente");

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como array vazio", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, []);

		expect(res).toBe("");
	});

	test("requisição passando 'idPhone' como undefined (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText(undefined, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como null (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText(null, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como objeto (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText({}, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como array (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText([], process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como boolean (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText(true, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como string vazia (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText("", process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idPhone' como number (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJsonText(42, process.env.ID_SPREADSHEET_TEST, pages);

		expect(typeof res).toBe("string");
	});

	test("requisição passando 'idSpreadsheet' como undefined", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, undefined, pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como null", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, null, pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como objeto", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, {}, pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como array", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, [], pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como boolean", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, true, pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como string vazia", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, "", pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como number", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, 42, pages);

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como undefined", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, undefined);

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como null", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, null);

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como objeto", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, {});

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como boolean", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, true);

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como string", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, "string");

		expect(res).toBeNull();
	});

	test("requisição passando 'pages' como number", async () => {
		const res = await googleSheets.getPageJsonText(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, 42);

		expect(res).toBeNull();
	});
});