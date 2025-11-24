import { getCabin } from "@/app/_lib/data-service.js";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image.js";

export default async function Page({ params }) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);
	const { id, name, max_capacity: maxCapacity, regular_price: regularPrice, discount, image, description } = cabin;

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
				<div className="relative aspect-square lg:aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
					<Image
						fill
						className="object-cover hover:scale-105 transition-transform duration-700"
						src={image}
						alt={`Cabin ${name}`}
					/>
				</div>

				<div className="flex flex-col justify-center space-y-8">
					<div>
						<h1 className="text-5xl lg:text-6xl font-bold text-accent-100 mb-6">Cabin {name}</h1>
						<p className="text-lg text-primary-200 leading-relaxed">{description}</p>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<div className="flex items-center gap-4 p-4 rounded-xl bg-primary-900/50 border border-primary-800 hover:border-accent-500 transition-colors">
							<div className="shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center">
								<UsersIcon className="h-6 w-6 text-accent-400" />
							</div>
							<div>
								<p className="text-sm text-primary-400">Capacity</p>
								<p className="text-lg font-semibold text-primary-100">Up to {maxCapacity} guests</p>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl bg-primary-900/50 border border-primary-800 hover:border-accent-500 transition-colors">
							<div className="shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center">
								<MapPinIcon className="h-6 w-6 text-accent-400" />
							</div>
							<div>
								<p className="text-sm text-primary-400">Location</p>
								<p className="text-lg font-semibold text-primary-100">Dolomites, Italy</p>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl bg-primary-900/50 border border-primary-800 hover:border-accent-500 transition-colors">
							<div className="shrink-0 w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center">
								<EyeSlashIcon className="h-6 w-6 text-accent-400" />
							</div>
							<div>
								<p className="text-sm text-primary-400">Privacy</p>
								<p className="text-lg font-semibold text-primary-100">100% guaranteed</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center py-16 px-8 rounded-2xl bg-linear-to-br from-primary-900 to-primary-950 border border-primary-800">
				<h2 className="text-4xl lg:text-5xl font-bold text-primary-100 mb-4">Reserve today. Pay on arrival.</h2>
				<p className="text-primary-300 text-lg">Secure your luxury escape in the Dolomites</p>
			</div>
		</div>
	);
}
