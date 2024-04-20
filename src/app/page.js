"use client";
import Leaderboard from "@/components/Leaderboard";
import RecordForm from "@/components/RecordForm";

export default function Home() {
	return (
		<main className={`bg-center bg-no-repeat bg-cover bg-fixed bg-[url('../../public/bg.jpeg')] h-screen`}>
			<div className="h-[99.9vh] snap-y overflow-x-hidden">
				<section className="snap-start">
					<RecordForm />
				</section>
				<section className="snap-start">
					<Leaderboard />
				</section>
			</div>
		</main>
	);
}
