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

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição feita sem parâmetros", async () => {
		const res = await googleSheets.getPages();

		expect(res).toBeNull();
	});

	test("requisição feita com 'idPhone' inválido (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages("id inválido", process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição feita com 'idSpreadsheet' inexistente", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, "planilha inexistente");

		expect(res).toBeNull();
	});

	test("requisição feita com 'idPhone' inválido e 'idSpreadsheet' inexistente", async () => {
		const res = await googleSheets.getPages("id inválido", "planilha inexistente");

		expect(res).toBeNull();
	});

	test("requisição passando 'idPhone' como undefined (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages(undefined, process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como null (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages(null, process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como objeto (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages({}, process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como array (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages([], process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como boolean (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages(true, process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como string vazia (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages("", process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idPhone' como number (deve retornar uma resposta normal, já que, o 'idPhone' serve para salvar erros)", async () => {
		const res = await googleSheets.getPages(42, process.env.ID_SPREADSHEET_TEST);

		expect(res).toEqual(expect.any(Array));
		expect(res.every((page) => (typeof page === "string"))).toBe(true);
	});

	test("requisição passando 'idSpreadsheet' como undefined", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, undefined);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como null", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, null);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como objeto", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, {});

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como array", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, []);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como boolean", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, true);

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como string vazia", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, "");

		expect(res).toBeNull();
	});

	test("requisição passando 'idSpreadsheet' como number", async () => {
		const res = await googleSheets.getPages(process.env.ID_PHONE_TEST, 42);

		expect(res).toBeNull();
	});
});