/**
 * @author VAMPETA
 * @brief MIDDLEWARE
 * @method POST
 * @route /webhook
*/
export default function getInfo(req, res, next) {
	// console.dir(req.body, { depth: null });
	// console.dir(req.entry, { depth: null });
	next();
}