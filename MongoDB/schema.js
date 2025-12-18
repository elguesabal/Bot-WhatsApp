import mongoose from "mongoose";

// const schema = new mongoose.Schema({
// 	numero: Number,
// 	nome: String,
// 	message: String
// });

// export default mongoose.model("whatsapp", schema);


// import schema from "./MongoDB/schema.js";
// try {
//     await schema.create({
//         numero: 42,
//         nome: "satoru gojo",
//         message: "vai tomando"
//     });
//     console.log("tava certo")
// } catch (error) {
//     console.log("tava errado")	
// }


const newContact = new mongoose.Schema({
	phone: String,
	name: String,
	chat: Array
});

// mongoose.model("contacts", newContact);
export default async function teste() {
	try {
		await mongoose.model("5521000000000", newContact).create({ // CRIAR USANDO NUMERO DE TELEFONE SERIA CERTO?
			phone: "5521000000000",
			name: "José",
			chat: [
				"oi",
				"eae"
			]
		});
		console.log("tava certo")
	} catch (error) {
		console.log("tava errado:", error)
	}
}