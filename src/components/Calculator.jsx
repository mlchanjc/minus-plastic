"use client";
import { useState } from "react";
import RecordForm from "./RecordForm";
import Image from "next/image";

const itemList = [
	{
		name: "自備環保袋",
		carbon: 57.0,
		money: 1.0,
		photo: "/item-photos/bag.webp",
	},
	{
		name: "自備水壺",
		carbon: 62.5,
		money: 8.0,
		photo: "/item-photos/bottle.jpg",
	},
	{
		name: "拒絕使用塑膠吸管",
		carbon: 5.3,
		money: 0.0,
		photo: "/item-photos/straw.jpg",
	},
	{
		name: "攜帶環保杯",
		carbon: 55.0,
		money: 4.0,
		photo: "/item-photos/bottle2.jpeg",
	},
	{
		name: "購買鋁罐咖啡",
		carbon: 50.0,
		money: 5.0,
		photo: "/item-photos/coffee.jpg",
	},
	{
		name: "選用環保補充裝",
		carbon: 270.0,
		money: 15.0,
		photo: "/item-photos/refill.jpg",
	},
	{
		name: "堂食取代外賣",
		carbon: 111.8,
		money: 2.0,
		photo: "/item-photos/dinein.jpeg",
	},
	{
		name: "不使用一次性塑膠餐具",
		carbon: 98.0,
		money: 0.0,
		photo: "/item-photos/plastic.webp",
	},
];

const Calculator = () => {
	const [submitSection, setSubmitSection] = useState(false);
	const [itemValues, setItemValues] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const [amounts, setAmounts] = useState({
		moneyAmount: 0,
		carbonAmount: 0,
	});

	console.log(itemValues);

	const handleValueChange = (index, value) => {
		if (value >= 0 && value <= 99) {
			const updatedValues = [...itemValues];
			updatedValues[index] = Number(value);
			setItemValues(updatedValues);
		}
	};

	const handleCalculate = () => {
		let carbon = 0;
		let money = 0;

		itemValues.forEach((value, i) => (carbon += value * itemList[i].carbon));
		itemValues.forEach((value, i) => (money += value * itemList[i].money));
		setAmounts({
			moneyAmount: money.toFixed(2),
			carbonAmount: carbon.toFixed(2),
		});
		setSubmitSection(true);
	};

	return (
		<div className="w-[98vw] h-[93vh] flex flex-col items-center justify-center">
			<div className="backdrop-blur-sm bg-white bg-opacity-90 w-11/12 lg:w-[1000px] xl:w-[1200px] h-4/5 relative overflow-hidden rounded">
				<div
					className={`w-full h-full flex flex-col items-center ${
						submitSection && "translate-y-full opacity-0"
					} duration-700 absolute inset-0 p-4 justify-between space-y-8`}
				>
					<strong className="text-3xl">減塑計算器</strong>
					<div className="grid grid-cols-4 grid-rows-2 gap-4">
						{itemList.map((item, i) => {
							return (
								<div key={`item-${i}`} className="flex flex-col items-center gap-y-2">
									<strong className="text-xl">{item.name}</strong>
									<div className="w-44 h-44 relative">
										<Image className="select-none" src={item.photo} fill alt={item.photo} priority />
									</div>
									<div className="flex items-center gap-x-2">
										<button
											className="hover:opacity-70 active:translate-y-px active:opacity-100"
											onClick={() =>
												setItemValues((prev) => {
													let temp = [...prev];
													if (temp[i] > 0) temp[i] -= 1;
													return temp;
												})
											}
										>
											<Image className="select-none" src="/minus.svg" width={30} height={30} alt="arrow" priority />
										</button>
										<input
											className="w-12 h-10 text-xl text-center outline-none rounded-lg border"
											type="number"
											value={itemValues[i] || ""}
											onChange={(e) => handleValueChange(i, e.target.value)}
										/>
										<button
											className="hover:opacity-70 active:translate-y-px active:opacity-100"
											onClick={() =>
												setItemValues((prev) => {
													let temp = [...prev];
													if (temp[i] < 99) temp[i] += 1;
													return temp;
												})
											}
										>
											<Image className="select-none" src="/plus.svg" width={30} height={30} alt="arrow" priority />
										</button>
									</div>
								</div>
							);
						})}
					</div>
					<div className="px-1 bg-lime-700 rounded-lg shadow-md">
						<button
							onClick={handleCalculate}
							className="rounded-lg px-8 py-2 bg-lime-400 shadow-lg active:shadow-none -translate-y-1.5 active:-translate-y-1 duration-150"
						>
							<strong className="text-gray-500">計算</strong>
						</button>
					</div>
				</div>
				<div className={`w-full h-full flex flex-col items-center ${!submitSection && "translate-y-full opacity-0"} duration-700 absolute inset-0`}>
					<button onClick={() => setSubmitSection(false)} className="absolute top-0 left-2 lg:top-6 lg:left-8 active:translate-y-0.5 hover:scale-105 duration-150">
						<Image className="select-none" src="/arrow.svg" width={50} height={50} alt="arrow" priority />
					</button>
					<RecordForm amounts={amounts} />
				</div>
			</div>
		</div>
	);
};

export default Calculator;
