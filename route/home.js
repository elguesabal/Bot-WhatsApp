import { readFile } from "fs/promises";

/**
 * @author VAMPETA
 * @brief ROTA QUE SERVE A PAGINA PRINCIPAL
 * @method GET
 * @route /home
 * @returns 200 - PAGINA HTML ENVIADA COM SUCESSO
*/
export default async function home(req, res) {
    res.status(200).send(await readFile("./page/home.html", "utf8"));
}