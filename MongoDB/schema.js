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

// const teste = new mongoose.Schema({
// 	campo1: String,
// 	campo2: Number
// });
// await mongoose.model("teste", teste).create({
// 	campo1: "teste",
// 	campo2: 42
// });





// const chats = new mongoose.Schema({
// 	contactNumber: { type: String, required: true, unique: true },
// 	contactName: String,
// 	createdAt: { type: Date, default: Date.now },
// 	lastMessage: String,
// 	lastMessageAt: Date
// });
const chats = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		default: ""
	},
	lastMessage: {
		text: String,
		timesTamp: Date
	}
});

// const messages = new mongoose.Schema({
// 	chatId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "Chat",
// 		required: true
// 	},
// 	from: {
// 		type: String,
// 		required: true
// 	},
// 	text: String,
// 	createdAt: {
// 		type: Date,
// 		default: Date.now
// 	}
// });
const messages = new mongoose.Schema({
	phone: {
		type: String,
		required: true
	},
	// iDMessage: {
	// 	type: Number,
	// 	require: true
	// },
	wamid: {
		type: String,
		require: true,
		unique: true
	},
	text: {
		type: String,
		default: ""
	}
});

const Chat = mongoose.model("Chat", chats);
const Message = mongoose.model("Message", messages);

export { Chat, Message };