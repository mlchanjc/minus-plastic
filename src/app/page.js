"use client";
import Calculator from "@/components/Calculator";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
	return (
		<main className={`bg-center bg-no-repeat bg-cover bg-fixed bg-[url('../../public/bg.jpeg')] h-screen overflow-x-hidden`}>
			<header className="h-[7vh] w-screen bg-gray-100 flex items-center px-12">
				<strong className="text-3xl">Calculator</strong>
			</header>
			<div className="h-[92.9vh] snap-y overflow-x-hidden">
				<section className="snap-start">
					<Calculator />
				</section>
				<section className="snap-start">
					<Leaderboard />
				</section>
			</div>
		</main>
	);
}
