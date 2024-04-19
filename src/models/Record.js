import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
		require: true,
	},
	plasticAmount: {
		type: Number,
		require: true,
	},
});

const Record = models.Record || model("Record", RecordSchema);

export default Record;
