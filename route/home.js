import { readFile } from "fs/promises";
import path from "path";

/**
 * @author VAMPETA
 * @brief ROTA QUE SERVE A PAGINA PRINCIPAL
 * @method GET
 * @route /home
 * @returns 200 - PAGINA HTML ENVIADA COM SUCESSO
*/
export default async function home(req, res) {
	res.status(200).send(await readFile(path.join(process.cwd(), "page", "home.html"), "utf8"));
}