import { Suspense } from "react";
import CabinList from "../_components/CabinList.js";
import Spinner from "../_components/Spinner.js";
import Filter from "../_components/Filter.js";
import ReservationReminder from "../_components/ReservationReminder.js";

export const metadata = {
	title: "Cabins",
};

export default async function Page({ searchParams }) {
	const params = await searchParams;
	const filter = params?.capacity ?? "all";

	return (
		<div>
			<h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Luxury Cabins</h1>
			<p className="text-primary-200 text-lg mb-10">
				Cozy yet luxurious cabins nestled among peaceful mountain scenery, designed to give you the perfect
				blend of comfort and adventure. Wake up to breathtaking views each morning, spend your days wandering
				through tranquil forest trails, and unwind in your private hot tub as the stars light up the night sky.
				Every detail is crafted to offer warmth, relaxation, and a true sense of escape. Discover a retreat
				where nature, comfort, and calm come together for an unforgettable getaway.
			</p>
			<div className="flex justify-end mb-6">
				<Filter />
			</div>
			<Suspense fallback={<Spinner />} key={filter}>
				<CabinList filter={filter} />
			
				<ReservationReminder/>
			</Suspense>
		</div>
	);
}
