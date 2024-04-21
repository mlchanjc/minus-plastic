"use client";
import { useState } from "react";
import RecordForm from "./RecordForm";
import Image from "next/image";

const itemList = [
	{
		name: "自備環保袋",
		carbon: 57.0,
		money: 1.0,
	},
	{
		name: "自備水壺",
		carbon: 62.5,
		money: 8.0,
	},
	{
		name: "拒絕使用塑膠吸管",
		carbon: 5.3,
		money: 0.0,
	},
	{
		name: "攜帶環保杯",
		carbon: 55.0,
		money: 4.0,
	},
	{
		name: "購買鋁罐咖啡",
		carbon: 50.0,
		money: 5.0,
	},
	{
		name: "選用環保補充裝",
		carbon: 270.0,
		money: 15.0,
	},
	{
		name: "堂食取代外賣",
		carbon: 111.8,
		money: 2.0,
	},
	{
		name: "不使用一次性塑膠餐具",
		carbon: 98.0,
		money: 0.0,
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
		if (value >= 0) {
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
				<div className={`w-full h-full flex flex-col items-center ${submitSection && "translate-y-full opacity-0"} duration-700 absolute inset-0`}>
					<div>enter</div>
					<div className="grid grid-cols-4 grid-rows-2 gap-4">
						{itemList.map((item, i) => {
							return (
								<div key={`item-${i}`}>
									<p>{item.name}</p>
									<input type="number" value={itemValues[i] || ""} onChange={(e) => handleValueChange(i, e.target.value)} />
								</div>
							);
						})}
					</div>

					<button onClick={handleCalculate}>cal</button>
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
