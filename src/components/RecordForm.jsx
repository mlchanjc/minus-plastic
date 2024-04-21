"use client";
import { createFakeRecords, createRecord, deleteAllRecord } from "@/apis";
import { useEffect, useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

const RecordForm = ({ amounts }) => {
	const [formData, setFormData] = useState({
		name: "",
		moneyAmount: 0,
		carbonAmount: 0,
	});
	const [totalAmount, setTotalAmount] = useState({
		moneyAmount: 0,
		carbonAmount: 0,
	});

	useEffect(() => {
		setFormData({
			name: localStorage.getItem("name") ?? "",
			...amounts,
		});
		setTotalAmount(
			localStorage.getItem("totalAmount")
				? JSON.parse(localStorage.getItem("totalAmount"))
				: {
						moneyAmount: 0,
						carbonAmount: 0,
				  }
		);
	}, [amounts]);

	const handleChange = (e) => {
		const newFormData = { ...formData, [e.target.name]: e.target.value };
		setFormData(newFormData);
		localStorage.setItem("name", e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.name.length > 0) {
			try {
				const { result } = await createRecord(formData.name, formData.moneyAmount);
				const newTotal = { totalMoneyAmount: result.totalMoneyAmount, totalCarbonAmount: result.totalCarbonAmount };
				setTotalAmount(newTotal);
				localStorage.setItem("totalMoneyAmount", JSON.stringify(newTotal));
			} catch (error) {
				window.alert(error.response?.data?.message);
			}
		}
	};

	return (
		<div className="w-full h-full flex flex-col lg:grid lg:grid-flow-col lg:grid-cols-2 items-center justify-around lg:justify-center lg:space-x-8 lg:py-12">
			<div className="flex flex-col justify-center max-md:px-12 lg:p-20 gap-y-2">
				<strong className="text-xl md:text-3xl xl:text-4xl">{`你今天節省了：`}</strong>
				<strong className="text-2xl md:text-5xl xl:text-6xl hover-underline-animation w-fit mb-2">
					$
					<AnimatedNumbers
						transitions={(index) => ({
							type: "spring",
							duration: index / 2.5,
							delay: 0.7,
						})}
						animateToNumber={formData.moneyAmount}
					/>
				</strong>
				<strong className="text-xl md:text-3xl xl:text-4xl">{`你今天減少了碳排放量：`}</strong>
				<strong className="text-2xl md:text-5xl xl:text-6xl hover-underline-animation w-fit">
					<AnimatedNumbers
						transitions={(index) => ({
							type: "spring",
							duration: index / 2.5,
							delay: 0.7,
						})}
						animateToNumber={formData.carbonAmount}
					/>
					克
				</strong>
			</div>
			<div className="flex flex-col items-center space-y-10">
				<strong className="lg:text-xl">輸入姓名，記錄你在減塑路上的每一步！</strong>
				<form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
					<div>
						<label className="font-bold mr-2">姓名:</label>
						<input name="name" maxLength={16} className="px-1" value={formData.name} onChange={handleChange} />
					</div>
					<div className="px-1 bg-lime-700 rounded-lg shadow-md">
						<button type="submit" className="rounded-lg px-8 py-2 bg-lime-400 shadow-lg active:shadow-none -translate-y-1.5 active:-translate-y-1">
							<strong className="text-gray-500">提交記錄</strong>
						</button>
					</div>
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
				<div className="flex flex-col items-center">
					<div className="text-xl lg:text-4xl flex items-center font-bold">
						<p>你一共節省了： $</p>

						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: index / 2.5,
							})}
							animateToNumber={totalAmount.moneyAmount}
						/>
					</div>
					<div className="text-xl lg:text-4xl flex items-center font-bold">
						<p>你一共減少了碳排放量：</p>

						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: index / 2.5,
							})}
							animateToNumber={totalAmount.moneyAmount}
						/>
						<p>克</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecordForm;
