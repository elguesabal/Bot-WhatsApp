import Server from "../serverTest.js";
import googleSheets from "../../../Google Sheets/GoogleSheets.js";

/**
 * @author VAMPETA
 * @brief TESTA O METODO 'getPageJson' DA CLASSE GoogleSheets
*/
describe("Google Sheets - getPageJson", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });
	let page;

	beforeAll(async () => {
		await server.start();
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.ID_SPREADSHEET_TEST) throw (new Error("ID_SPREADSHEET_TEST não configurado"));
		const pages = await googleSheets.getPages(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST);
		page = pages[0];
	});

	afterAll(async () => {
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição feita com 'idPhone' inválido (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson("id inválido", process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição feita com 'idSpreadsheet' inexistente", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, "planilha inexistente", page);

		expect(res).toBeNull();
	});

	test("requisição feita com 'page' inexistente", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, "página inexistente");

		expect(res).toBeNull();
	});

	test("requisição feita com 'idPhone' inválido, 'idSpreadsheet' inexistente e 'page' inexistente", async () => {
		const res = await googleSheets.getPageJson("id inválido", "planilha inexistente", "página inexistente");

		expect(res).toBeNull();
	});

	test("requisição passando 'idPhone' como undefined (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson(undefined, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como null (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson(null, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como objeto (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson({}, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como array (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson([], process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como boolean (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson(true, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como string vazia (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson("", process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idPhone' como number (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPageJson(42, process.env.ID_SPREADSHEET_TEST, page);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "object"))).toBe(true);
	});

	test("requisição passando 'idSpreadsheet' como undefined", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, undefined, page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como null", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, null, page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como objeto", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, {}, page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como array", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, [], page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como boolean", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, true, page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como string vazia", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, "", page);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como number", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, 42, page);

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como undefined", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, undefined);

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como null", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, null);

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como objeto", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, {});

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como array", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, []);

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como boolean", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, true);

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como string vazia", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, "");

		expect(res).toBeNull();
	});

	test("requisição passando 'page' como number", async () => {
		const res = await googleSheets.getPageJson(process.env.ID_PHONE_TEST, process.env.ID_SPREADSHEET_TEST, 42);

		expect(res).toBeNull();
	});
});