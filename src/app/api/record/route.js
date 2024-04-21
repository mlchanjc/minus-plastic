import { connectToDB } from "@/utils/database";
import Record from "@/models/Record";

export const POST = async (req) => {
	await connectToDB();
	try {
		const { username, moneyAmount, carbonAmount } = await req.json();

		// Check if moneyAmount is a valid number
		if (isNaN(moneyAmount) || isNaN(carbonAmount)) {
			return new Response(JSON.stringify({ message: "Invalid amount" }), { status: 401 });
		}

		if (username.length > 16) {
			return new Response(JSON.stringify({ message: "Name too long!(max 16 characters)" }), { status: 401 });
		}

		// Check if the user has submitted today
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

		const hasRecordToday = await Record.findOne({
			username: username,
			createdAt: { $gte: today },
		});

		if (hasRecordToday) {
			return new Response(JSON.stringify({ message: "You have already submitted today!" }), { status: 400 });
		}

		// Create record if not yet submitted today
		await Record.create([
			{
				username,
				createdAt: Date.now(),
				moneyAmount,
				carbonAmount,
			},
		]);

		// Get and return today plastic amount of this user
		const result = await Record.aggregate([
			{
				$match: { username },
			},
			{
				$group: {
					_id: "$username",
					totalMoneyAmount: { $sum: "$moneyAmount" },
					totalCarbonAmount: { $sum: "$carbonAmount" },
				},
			},
		]);

		return new Response(JSON.stringify({ result: result[0] }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
	}
};

export const DELETE = async (req) => {
	await connectToDB();
	try {
		await Record.deleteMany({});

		return new Response(JSON.stringify({ message: "Deleted all" }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
	}
};
