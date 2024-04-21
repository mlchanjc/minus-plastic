import { connectToDB } from "@/utils/database";
import Record from "@/models/Record";

export const GET = async (req, { params }) => {
	await connectToDB();
	try {
		const criteria = params.criteria;

		let result;

		if (criteria === "monthly") {
			const currentDate = new Date();
			const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
			const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

			result = await Record.aggregate([
				{ $match: { createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
				{
					$group: {
						_id: "$username",
						totalMoneyAmount: { $sum: "$moneyAmount" },
						totalCarbonAmount: { $sum: "$carbonAmount" },
					},
				},
				{ $sort: { totalMoneyAmount: -1 } },
				{ $limit: 20 },
			]);
		} else if (criteria === "weekly") {
			const currentDate = new Date();
			const currentDay = currentDate.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6

			const startOfWeek = new Date(currentDate);
			startOfWeek.setDate(currentDate.getDate() - ((currentDay + 6) % 7)); // Adjust to Monday as the start of the week

			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(startOfWeek.getDate() + 7); // Add 7 days to get the end of the week

			result = await Record.aggregate([
				{ $match: { createdAt: { $gte: startOfWeek, $lt: endOfWeek } } },
				{
					$group: {
						_id: "$username",
						totalMoneyAmount: { $sum: "$moneyAmount" },
						totalCarbonAmount: { $sum: "$carbonAmount" },
					},
				},
				{ $sort: { totalMoneyAmount: -1 } },
				{ $limit: 20 },
			]);
		} else if (criteria === "daily") {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			result = await Record.aggregate([
				{ $match: { createdAt: { $gte: today } } },
				{
					$group: {
						_id: "$username",
						totalMoneyAmount: { $sum: "$moneyAmount" },
						totalCarbonAmount: { $sum: "$carbonAmount" },
					},
				},
				{ $sort: { totalMoneyAmount: -1 } },
				{ $limit: 20 },
			]);
		} else {
			return new Response(JSON.stringify({ message: "Invalid time range" }), { status: 401 }).sort({ moneyAmount: -1 }).limit(20);
		}

		return new Response(JSON.stringify({ result }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
	}
};
