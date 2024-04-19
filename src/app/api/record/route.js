import { connectToDB } from "@/utils/database";
import Record from "@/models/Record";

export const POST = async (req) => {
	await connectToDB();
	try {
		const { username, email, plasticAmount } = await req.json();

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
				email,
				createdAt: Date.now(),
				plasticAmount,
			},
		]);

		// Get and return today plastic amount of this user
		const totalPlasticAmount = await Record.aggregate([
			{
				$match: { username },
			},
			{
				$group: {
					_id: "$username",
					totalPlasticAmount: { $sum: "$plasticAmount" },
				},
			},
		]);

		return new Response(JSON.stringify({ totalPlasticAmount }), { status: 200 });
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
