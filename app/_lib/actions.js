"use server";

import { auth, signIn, signOut } from "./auth.js";
import { supabase } from "./supabase.js";

export async function updateProfile(formData) {
	const session = await auth();
	if (!session) {
		throw new Error("You must be logged in");
	}

	const { national_id, nationality: combined } = Object.fromEntries(formData);
	const [nationality, country_flag] = combined.split("%");

	if (!/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
		throw new Error("Please provide a valid national id");
	}

	const updateData = { nationality, country_flag, national_id };

	const { data, error } = await supabase.from("guests").update(updateData).eq("id", session.user.guestId);

	if (error) {
		throw new Error("Guest could not be updated");
	}
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
