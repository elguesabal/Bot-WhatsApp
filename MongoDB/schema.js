import mongoose from "mongoose";

const chats = new mongoose.Schema({
	photo: {
		type: String,
		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s",
		require: false
	},
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
		timesTamp: Date,
		status: {
			type: String,
			default: undefined
		}
	}
});

const messages = new mongoose.Schema({
	phone: {
		type: String,
		required: true
	},
	wamid: {
		type: String,
		require: true,
		unique: true
	},
	direction: {
		type: String,
		require: true
	},
	timesTamp: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		default: undefined
	},
	type: {
		type: String,
		require: true
	},
	text: {
		type: String,
		default: undefined
	},
	// image: {
	// 	type: String,
	// 	default: undefined
	// },
	// location: {
	// 	type: Object,
	// 	default: undefined
	// },
	// contact: {
	// 	type: Object,
	// 	default: undefined
	// },
	// button: {
	// 	type: Object,
	// 	default: undefined
	// }
});

const Chat = mongoose.model("Chat", chats);
const Message = mongoose.model("Message", messages);

export { Chat, Message };