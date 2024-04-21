"use client";
import { useState } from "react";
import RecordForm from "./RecordForm";
import Image from "next/image";

const itemList = [];

const Calculator = () => {
	const [submitSection, setSubmitSection] = useState(false);
	const [amounts, setAmounts] = useState({
		moneyAmount: 0,
		carbonAmount: 0,
	});

	const handleCalculate = () => {
		setSubmitSection(true);
	};

	return (
		<div className="w-[98vw] h-[93vh] flex flex-col items-center justify-center">
			<div className="backdrop-blur-sm bg-white bg-opacity-90 w-11/12 lg:w-[1000px] xl:w-[1200px] h-4/5 relative overflow-hidden rounded">
				<div className={`w-full h-full flex flex-col items-center ${submitSection && "translate-y-full opacity-0"} duration-700 absolute inset-0`}>
					<div>enter</div>
					<div>123</div>
					<div>
						<label>姓名:</label>
						<input name="name" value={amounts.moneyAmount} onChange={(e) => setAmounts((prev) => ({ ...prev, moneyAmount: e.target.value }))} />
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
