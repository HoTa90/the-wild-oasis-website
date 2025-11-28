"use client";

import { useActionState } from "react";
import { updateProfile } from "../_lib/actions.js";
import SpinnerMini from "./SpinnerMini.js";

const initialState = {
	error: null,
	success: false,
	guest: null,
};

export default function UpdateProfileForm({ children, guest }) {
	const [state, formAction, pending] = useActionState(updateProfile, {
		...initialState,
		guest,
	});

	const updatedGuest = state.guest ?? guest;

	const {
		full_name: fullName,
		national_id: nationalId,
		country_flag: countryFlag,
		nationality,
		email,
	} = updatedGuest;

	return (
		<form
			action={formAction}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
			<div className="space-y-2">
				<label>Full name</label>
				<input
					name="full_name"
					disabled
					defaultValue={fullName}
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					name="email"
					defaultValue={email}
					disabled
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>

					{countryFlag && (
						<img
							src={countryFlag}
							alt="Country flag"
							className="h-5 rounded-sm"
						/>
					)}
				</div>

				{children}
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					disabled={pending}
					defaultValue={nationalId}
					name="national_id"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="flex justify-end items-center gap-6">
				<button
					disabled={pending}
					className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 flex gap-2 items-center transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
					{pending ? "Updating..." : "Update profile"}
					{pending && <SpinnerMini />}
				</button>
			</div>
			{state.error && <p className="text-red-400 bg-red-950/40 px-4 py-2 rounded">{state.error}</p>}
		</form>
	);
}
