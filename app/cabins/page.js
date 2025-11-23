import CabinCard from "../_components/CabinCard.js";


export const metadata = {
	title: "Cabins",
};
export default function Page() {
  // CHANGE
  const cabins = [];

  return (
	<div>
	  <h1 className="text-4xl mb-5 text-accent-400 font-medium">
		Our Luxury Cabins
	  </h1>
	  <p className="text-primary-200 text-lg mb-10">
		Cozy yet luxurious cabins nestled among peaceful mountain scenery, designed to give you the perfect blend of comfort and adventure. Wake up to breathtaking views each morning, spend your days wandering through tranquil forest trails, and unwind in your private hot tub as the stars light up the night sky. Every detail is crafted to offer warmth, relaxation, and a true sense of escape. Discover a retreat where nature, comfort, and calm come together for an unforgettable getaway.
	  </p>

	  {cabins.length > 0 && (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
		  {cabins.map((cabin) => (
			<CabinCard cabin={cabin} key={cabin.id} />
		  ))}
		</div>
	  )}
	</div>
  );
}
