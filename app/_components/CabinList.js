import { unstable_noStore } from "next/cache.js";
import { getCabins } from "../_lib/data-service.js";
import CabinCard from "./CabinCard.js";

export default async function CabinList({ filter }) {
	unstable_noStore();
	const cabins = await getCabins();

	if (!cabins.length) return null;

	let displayedCabins;
	if (filter === "all") {
		displayedCabins = cabins;
	}

	if (filter === "small") {
		displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
	}

	if (filter === "medium") {
		displayedCabins = cabins.filter((cabin) => cabin.max_capacity > 3 && cabin.max_capacity <= 7);
	}
	if (filter === "large") {
		displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
	}

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{displayedCabins.map((cabin) => (
				<CabinCard
					cabin={cabin}
					key={cabin.id}
				/>
			))}
		</div>
	);
}
