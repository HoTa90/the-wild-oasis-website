"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation.js";

const filters = [
	{ key: "all", label: "All" },
	{ key: "small", label: "1—3 guests" },
	{ key: "medium", label: "4—7 guests" },
	{ key: "large", label: "8—12 guests" },
];

export default function Filter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const path = usePathname();

	const activeFilter = searchParams.get("capacity") ?? "all";

	const handleFilter = (filter) => {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		router.replace(`${path}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="border border-primary-800 flex">
			{filters.map((f) => (
				<button
					key={f.key}
					onClick={() => handleFilter(f.key)}
					className={`px-5 py-2 hover:bg-primary-700 text-primary-200 ${
						activeFilter === f.key ? "bg-primary-700 " : ""
					}`}>
					{f.label}
				</button>
			))}
		</div>
	);
}
