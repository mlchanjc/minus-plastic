import axios from "axios";

const api = axios.create({
	baseURL: `/api/record`,
});

export const createRecord = async (username, moneyAmount, carbonAmount) => {
	const { data } = await api.post("", { username, moneyAmount, carbonAmount });
	console.log(data);
	return data;
};

export const deleteAllRecord = async () => {
	const { data } = await api.delete("");
	return data;
};

export const createFakeRecords = async () => {
	const { data } = await api.post("/fakedata");
	return data;
};

export const getRanking = async (criteria) => {
	const { data } = await api.get(`/ranking/${criteria}`);
	return data;
};
