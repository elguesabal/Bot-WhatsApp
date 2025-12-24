import express from "express";
import cors from "cors";

const app = express();
app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		}
	})
);
app.use(cors());
export default app;