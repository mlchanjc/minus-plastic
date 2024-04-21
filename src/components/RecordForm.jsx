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
		totalMoneyAmount: 0,
		totalCarbonAmount: 0,
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
						totalMoneyAmount: 0,
						totalCarbonAmount: 0,
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
				const { result } = await createRecord(formData.name, formData.moneyAmount, formData.carbonAmount);
				const newTotal = { totalMoneyAmount: result.totalMoneyAmount, totalCarbonAmount: result.totalCarbonAmount };
				setTotalAmount(newTotal);
				localStorage.setItem("totalAmount", JSON.stringify(newTotal));
			} catch (error) {
				window.alert(error.response?.data?.message);
			}
		}
	};

	return (
		<div className="w-full h-full flex flex-col lg:grid lg:grid-flow-col lg:grid-cols-2 items-center justify-center max-lg:gap-y-8 max-lg:divide-y-2 lg:divide-x-2 divide-gray-500 lg:space-x-8 lg:py-12">
			<div className="flex flex-col justify-center max-md:px-12 lg:p-20 gap-y-4 font-bold">
				<div className="lg:text-4xl flex flex-col">
					<p>你今天節省了：</p>
					<div className="flex">
						$
						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: (index + 0.5) / 1.5,
								delay: 0.8,
							})}
							animateToNumber={formData.moneyAmount}
						/>
					</div>
				</div>
				<div className="lg:text-4xl flex flex-col">
					<p>你今天減少了碳排放量：</p>
					<div className="flex">
						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: (index + 0.5) / 1.5,
								delay: 0.8,
							})}
							animateToNumber={formData.carbonAmount}
						/>
						克
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center space-y-10 max-lg:pt-8">
				<strong className="lg:text-xl">輸入姓名，記錄你在減塑路上的每一步！</strong>
				<form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
					<div>
						<label className="font-bold mr-2">姓名:</label>
						<input name="name" maxLength={16} className="rounded p-1 outline-none" value={formData.name} onChange={handleChange} />
					</div>
					<div className="px-1 bg-lime-700 rounded-lg shadow-md">
						<button type="submit" className="rounded-lg px-8 py-2 bg-lime-400 shadow-lg active:shadow-none -translate-y-1.5 active:-translate-y-1 duration-150">
							<strong className="text-gray-500">提交記錄</strong>
						</button>
					</div>
				</form>
				<div className="flex flex-col items-center font-bold">
					<div className="text-xl lg:text-3xl flex items-center">
						<p>你一共減少了碳排放量：</p>

						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: (index + 0.5) / 1.5,
								delay: 0.1,
							})}
							animateToNumber={totalAmount.totalCarbonAmount}
						/>
						<p>克</p>
					</div>
					<div className="text-xl lg:text-3xl flex items-center">
						<p>你一共節省了： $</p>

						<AnimatedNumbers
							transitions={(index) => ({
								type: "spring",
								duration: (index + 0.5) / 1.5,
								delay: 0.1,
							})}
							animateToNumber={totalAmount.totalMoneyAmount}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecordForm;
