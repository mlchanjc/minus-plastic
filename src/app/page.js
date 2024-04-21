"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Calculator = dynamic(() => import("@/components/Calculator"), {
	ssr: false,
});

const Leaderboard = dynamic(() => import("@/components/Leaderboard"), {
	ssr: false,
});

export default function Home() {
	const leaderBoardRef = useRef(null);
	const calculatorRef = useRef(null);
	const [init, setInit] = useState(false);

	useEffect(() => {
		const func = async () => {
			setTimeout(() => {
				setInit(true);
			}, 500);
		};

		func();
		// prevent auto scroll to bottom after loading
	}, []);

	function scrollToLeaderboard() {
		leaderBoardRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	function scrollToCalculator() {
		calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<main className={`bg-center bg-no-repeat bg-cover bg-fixed bg-[url('../../public/bg.jpeg')] h-screen overflow-x-hidden`}>
			<header className="h-[7vh] w-screen bg-gray-100 flex items-center px-4 md:px-20 justify-between">
				<strong className="md:text-3xl">減塑計算器</strong>
				<div className="flex space-x-6">
					<button
						onClick={scrollToLeaderboard}
						className="rounded px-6 py-2 border hover:shadow-md active:shadow-none hover:-translate-y-px active:translate-y-0 duration-150 bg-yellow-300"
					>
						<strong>排行榜</strong>
					</button>
					<button
						onClick={scrollToCalculator}
						className="rounded px-6 py-2 border hover:shadow-md active:shadow-none hover:-translate-y-px active:translate-y-0 duration-150 bg-lime-300"
					>
						<strong>計算器</strong>
					</button>
				</div>
			</header>
			<div className={`h-[92.9vh] ${init && "snap-y"} overflow-x-hidden`}>
				<section className={`${init && "snap-start"}`} ref={calculatorRef}>
					<Calculator />
				</section>
				{init && (
					<section className={`${init && "snap-start"}`} ref={leaderBoardRef}>
						<Leaderboard />
					</section>
				)}
			</div>
		</main>
	);
}
