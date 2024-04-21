"use client";
import { getRanking } from "@/apis";
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

const Leaderboard = () => {
	const [criteria, setCriteria] = useState("daily"); // monthly, weekly, daily
	const [ranking, setRanking] = useState(null);
	const ref = useRef(null);
	const isInView = useInView(ref);

	useEffect(() => {
		const fetchRanking = async () => {
			setRanking(null);
			const { result } = await getRanking(criteria);
			setRanking(result);
		};

		fetchRanking();
	}, [criteria]);

	const handleChangeCriteria = async (e) => {
		setCriteria(e.target.childNodes[0].textContent.toLowerCase());
	};

	return (
		<div className="overflow-hidden h-[93vh]">
			<div className={`w-[98vw] flex items-center justify-center duration-1000 ${isInView ? "opacity-100" : "translate-y-[300px] opacity-0"} transition-all`} ref={ref}>
				{ranking && (
					<div className="flex flex-col items-center h-[93vh] w-[400px] sm:w-[600px]">
						<div className="grid grid-flow-row grid-cols-3 w-1/2 m-4">
							<button onClick={handleChangeCriteria}>
								<strong className="hover-underline-animation">Monthly</strong>
							</button>
							<button onClick={handleChangeCriteria}>
								<strong className="hover-underline-animation">Weekly</strong>
							</button>
							<button onClick={handleChangeCriteria}>
								<strong className="hover-underline-animation">Daily</strong>
							</button>
						</div>
						<div className="grid grid-flow-row grid-cols-3 items-end justify-center gap-x-2 sm:gap-x-8 p-4 h-2/5 w-full">
							<div className="flex flex-col items-center h-4/5 bg-white bg-opacity-50 rounded-xl p-4 space-y-2">
								<motion.div animate={{ rotate: isInView ? 0 : getRandomNumber() }} transition={{ type: "spring", damping: 5 }}>
									<Image className="select-none" src="/second-place.svg" width={100} height={100} alt="second-place" priority />
								</motion.div>
								{ranking[1] && (
									<>
										<strong>{ranking[1]._id}</strong>
										<p className="text-sm bg-white text-center rounded-lg py-2 px-4">{ranking[1].totalMoneyAmount.toFixed(2)}</p>
									</>
								)}
							</div>
							<div className="flex flex-col items-center h-full bg-white bg-opacity-50 rounded-xl p-4 space-y-2">
								<motion.div animate={{ rotate: isInView ? 0 : getRandomNumber() }} transition={{ type: "spring", damping: 7 }}>
									<Image className="select-none" src="/first-place.svg" width={100} height={100} alt="first-place" priority />
								</motion.div>
								{ranking[0] && (
									<>
										<strong>{ranking[0]._id}</strong>
										<p className="text-sm bg-white text-center rounded-lg py-2 px-4">{ranking[0].totalMoneyAmount.toFixed(2)}</p>
									</>
								)}
							</div>
							<div className="flex flex-col items-center h-4/5 bg-white bg-opacity-50 rounded-xl p-4 space-y-2">
								<motion.div animate={{ rotate: isInView ? 0 : getRandomNumber() }} transition={{ type: "spring", damping: 4 }}>
									<Image className="select-none" src="/third-place.svg" width={100} height={100} alt="third-place" priority />
								</motion.div>
								{ranking[2] && (
									<>
										<strong>{ranking[2]._id}</strong>
										<p className="text-sm bg-white text-center rounded-lg py-2 px-4">{ranking[2].totalMoneyAmount.toFixed(2)}</p>
									</>
								)}
							</div>
						</div>
						<ul className="w-full overflow-auto bg-white rounded-xl custom-scrollbar -translate-y-8 h-4/6 divide-y">
							{ranking.map(
								(user, i) =>
									i >= 3 && (
										<li key={`rank${i}`} className="flex items-center p-4 space-x-4">
											<div className="rounded-full bg-lime-200 p-1 flex-shrink-0 w-8 aspect-square text-center text-green-600">{i + 1}</div>
											<div>
												<strong>{user._id}</strong>
												<p className="text-sm">{user.totalMoneyAmount.toFixed(2)}</p>
											</div>
										</li>
									)
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Leaderboard;
