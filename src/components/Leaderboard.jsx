"use client";
import { getRanking } from "@/apis";
import { formatNumber } from "@/utils/formatNumber";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function getRandomNumber() {
	let randomNumber;

	do {
		randomNumber = Math.floor(Math.random() * 141) - 70;
	} while (randomNumber >= -30 && randomNumber <= 30);

	return randomNumber;
}

const Spinner = () => {
	return (
		<svg className="animate-spin -ml-1 mr-3 h-32 w-32 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
			<path className="opacity-75" fill="#03a8f4" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	);
};

const Leaderboard = () => {
	const [criteria, setCriteria] = useState("daily"); // monthly, weekly, daily
	const [ranking, setRanking] = useState(null);
	const ref = useRef(null);
	const isInView = useInView(ref);

	useEffect(() => {
		const fetchRanking = async () => {
			const { result } = await getRanking(criteria);
			setRanking(result);
		};
		if (isInView && !ranking) {
			fetchRanking();
		}
	}, [criteria, isInView]);

	const handleChangeCriteria = async (newCriteria) => {
		if (newCriteria !== criteria) {
			setRanking(null);
			setCriteria(newCriteria);
		}
	};

	return (
		<div className="overflow-hidden h-[93vh]">
			<div className={`w-[98vw] flex items-center justify-center duration-1000 ${isInView ? "opacity-100" : "translate-y-[300px] opacity-0"} transition-all`} ref={ref}>
				{ranking ? (
					<div className="flex flex-col items-center h-[93vh] w-[400px] sm:w-[450px] 2xl:w-[600px]">
						<div className="grid grid-flow-row grid-cols-3 w-2/3 m-4">
							<button onClick={() => handleChangeCriteria("monthly")}>
								<strong className="hover-underline-animation text-2xl bg-white px-2 py-1 bg-opacity-30 rounded">每月</strong>
							</button>
							<button onClick={() => handleChangeCriteria("weekly")}>
								<strong className="hover-underline-animation text-2xl bg-white px-2 py-1 bg-opacity-30 rounded">每周</strong>
							</button>
							<button onClick={() => handleChangeCriteria("daily")}>
								<strong className="hover-underline-animation text-2xl bg-white px-2 py-1 bg-opacity-30 rounded">每日</strong>
							</button>
						</div>
						<div className="grid grid-flow-row grid-cols-3 items-end justify-center gap-x-2 sm:gap-x-4 2xl:gap-x-8 p-2 2xl:p-4 h-2/5 w-full">
							<div className="flex flex-col items-center h-5/6 bg-white bg-opacity-50 rounded-xl p-2 2xl:p-4 space-y-2">
								<motion.div
									animate={{ rotate: isInView ? 0 : getRandomNumber() }}
									transition={{ type: "spring", damping: 5 }}
									className="w-[50px] lg:w-[70px] 2xl:w-[90px] aspect-square relative"
								>
									<Image className="select-none" src="/second-place.svg" fill alt="second-place" priority />
								</motion.div>
								{ranking[1] && (
									<>
										<strong>{ranking[1]._id}</strong>
										<div className="text-sm bg-white rounded-lg py-1 px-4">
											<p>${formatNumber(ranking[1].totalMoneyAmount)}</p>
											<p>{formatNumber(ranking[1].totalCarbonAmount)}克</p>
										</div>
									</>
								)}
							</div>
							<div className="flex flex-col items-center h-full bg-white bg-opacity-50 rounded-xl p-2 2xl:p-4 space-y-2">
								<motion.div
									animate={{ rotate: isInView ? 0 : getRandomNumber() }}
									transition={{ type: "spring", damping: 7 }}
									className="w-[50px] lg:w-[70px] 2xl:w-[90px] aspect-square relative"
								>
									<Image className="select-none" src="/first-place.svg" fill alt="first-place" priority />
								</motion.div>
								{ranking[0] && (
									<>
										<strong>{ranking[0]._id}</strong>
										<div className="text-sm bg-white rounded-lg py-1 px-4">
											<p>${formatNumber(ranking[0].totalMoneyAmount)}</p>
											<p>{formatNumber(ranking[0].totalCarbonAmount)}克</p>
										</div>
									</>
								)}
							</div>
							<div className="flex flex-col items-center h-5/6 bg-white bg-opacity-50 rounded-xl p-2 2xl:p-4 space-y-2">
								<motion.div
									animate={{ rotate: isInView ? 0 : getRandomNumber() }}
									transition={{ type: "spring", damping: 4 }}
									className="w-[50px] lg:w-[70px] 2xl:w-[90px] aspect-square relative"
								>
									<Image className="select-none" src="/third-place.svg" fill alt="third-place" priority />
								</motion.div>
								{ranking[2] && (
									<>
										<strong>{ranking[2]._id}</strong>
										<div className="text-sm bg-white rounded-lg py-1 px-4">
											<p>${formatNumber(ranking[2].totalMoneyAmount)}</p>
											<p>{formatNumber(ranking[2].totalCarbonAmount)}克</p>
										</div>
									</>
								)}
							</div>
						</div>
						<ul className="w-full overflow-auto bg-white rounded-xl custom-scrollbar -translate-y-6 flex-auto divide-y">
							{ranking.map(
								(user, i) =>
									i >= 3 && (
										<li key={`rank${i}`} className="flex items-center p-4 space-x-4">
											<div className="rounded-full bg-lime-200 p-1 flex-shrink-0 w-8 aspect-square text-center text-green-600">{i + 1}</div>
											<strong>{user._id}</strong>
											<div>
												<p className="text-sm">${formatNumber(user.totalMoneyAmount)}</p>
												<p className="text-sm">{formatNumber(user.totalCarbonAmount)}克</p>
											</div>
										</li>
									)
							)}
						</ul>
					</div>
				) : (
					<div className="h-screen flex items-center justify-center">
						<Spinner />
					</div>
				)}
			</div>
		</div>
	);
};

export default Leaderboard;
