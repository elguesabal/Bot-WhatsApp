// import axios from "axios";

// const res = await axios({
// 	method: "POST",
// 	url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
// 	headers: {
// 		Authorization: "Bearer " + process.env.ACCESS_TOKEN,
// 	},
// 	data: {
// 		messaging_product: "whatsapp",
// 		to: process.env.MY_NUMBER,
// 		type: "text",
// 		text: {
// 			body: "ala teu pai"
// 		}
// 	}
// });

// if (res.status === 200) console.log("mensagem enviada");
// if (res.status !== 200) console.log(res.status, "\n\n", res.data);