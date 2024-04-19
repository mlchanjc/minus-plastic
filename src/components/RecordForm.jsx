"use client";
import { createFakeRecords, createRecord, deleteAllRecord } from "@/apis";
import { useState } from "react";

const RecordForm = () => {
	const [formData, setFormData] = useState(
		localStorage.getItem("form-data")
			? JSON.parse(localStorage.getItem("form-data"))
			: {
					name: "",
					email: "",
			  }
	);

	const handleChange = (e) => {
		const newFormData = { ...formData, [e.target.name]: e.target.value };
		setFormData(newFormData);
		localStorage.setItem("form-data", JSON.stringify(newFormData));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createRecord(formData.name, formData.email, 10.56);
		} catch (error) {
			window.alert(error.response?.data?.message);
		}
	};

	return (
		<div className="w-[98vw] h-[100vh] flex items-center justify-center">
			<form onSubmit={handleSubmit} className="flex flex-col items-center rounded border bg-red-500 p-8 space-y-4">
				<div>
					<label>Name:</label>
					<input name="name" value={formData.name} onChange={handleChange} />
				</div>
				<div>
					<label>Email:</label>
					<input name="email" value={formData.email} onChange={handleChange} />
				</div>
				<button type="submit">Submit</button>
				<div
					onClick={async () => {
						if (window.confirm("delete all?")) await deleteAllRecord();
					}}
				>
					delete
				</div>

				<div
					onClick={async () => {
						if (window.confirm("create?")) await createFakeRecords();
					}}
				>
					Create fake
				</div>
			</form>
		</div>
	);
};

export default RecordForm;
