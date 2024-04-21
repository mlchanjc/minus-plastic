import { connectToDB } from "@/utils/database";
import Record from "@/models/Record";

function getRandomDate() {
	const currentDate = new Date(); // Get the current date
	const oneMonthAgo = new Date(); // Create a new date object for 1 month ago

	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract 1 month from the current date

	const randomTimestamp = Math.random() * (currentDate.getTime() - oneMonthAgo.getTime()) + oneMonthAgo.getTime();
	const randomDate = new Date(randomTimestamp);

	return randomDate;
}

export const POST = async (req) => {
	await connectToDB();
	try {
		const names = [
			"James",
			"Thomas",
			"Oliver",
			"William",
			"Henry",
			"Benjamin",
			"Jacob",
			"Michael",
			"Ethan",
			"Alexander",
			"Daniel",
			"Matthew",
			"Joseph",
			"David",
			"Samuel",
			"Andrew",
			"Christopher",
			"Nathan",
			"Joshua",
			"Anthony",
			"Jonathan",
			"Kevin",
			"Ryan",
			"John",
			"Robert",
			"Steven",
			"Brian",
			"Eric",
			"Jason",
			"Mark",
		];

		let fakeRecords = [];

		for (let i = 0; i < 300; i++) {
			fakeRecords.push({
				username: names[Math.floor(Math.random() * names.length)],
				createdAt: getRandomDate(),
				moneyAmount: Math.random() * 500,
				carbonAmount: Math.random() * 500,
			});
		}

		const bulkOperations = fakeRecords.map((record) => ({
			insertOne: {
				document: record,
			},
		}));
		await Record.bulkWrite(bulkOperations);

		return new Response(JSON.stringify({ message: "Created" }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
	}
};
