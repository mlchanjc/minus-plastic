import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
		require: true,
	},
	moneyAmount: {
		type: Number,
		require: true,
	},
	carbonAmount: {
		type: Number,
		require: true,
	},
});

const Record = models.Record || model("Record", RecordSchema);

export default Record;
