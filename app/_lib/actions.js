"use server";

import { revalidatePath } from "next/cache.js";
import { auth, signIn, signOut } from "./auth.js";
import { supabase } from "./supabase.js";

export async function updateProfile(prevState, formData) {
	const session = await auth();
	if (!session) {
		return {
			...prevState,
			error: "You must be logged in",
			success: false,
		};
	}

	const { national_id, nationality: combined } = Object.fromEntries(formData);
	const [nationality, country_flag] = combined.split("%");

	const updatedGuest = {
		...(prevState.guest ?? {}),
		nationality,
		country_flag,
		national_id,
	};

	if (!/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
		return {
			...prevState,
			error: "Please provide a valid national id",
			success: false,
			guest: updatedGuest,
		};
	}

	const updateData = { nationality, country_flag, national_id };

	const { error } = await supabase.from("guests").update(updateData).eq("id", session.user.guestId);

	if (error) {
		return {
			...prevState,
			error: "Guest could not be updated",
			success: false,
			guest: updatedGuest,
		};
	}

	revalidatePath("/account/profile");

	return {
		error: null,
		success: true,
		guest: updatedGuest,
	};
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
