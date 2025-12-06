"use server";

import { revalidatePath } from "next/cache.js";
import { auth, signIn, signOut } from "./auth.js";
import { supabase } from "./supabase.js";
import { getBookings } from "./data-service.js";
import { redirect } from "next/navigation.js";

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

export async function updateReservation(prevState, formData) {
  const session = await auth();
  if (!session) {
    return {
      ...prevState,
      error: "You must be logged in",
      success: false,
    };
  }

  const data = Object.fromEntries(formData);
  const reservationId = Number(data.reservationId);
  const numGuests = Number(data.numGuests);
  const observations = data.observations ?? "";

  const guestBookings = await getBookings(session.user.guestId);
  const ownsReservation = guestBookings.some(
    (booking) => booking.id === reservationId
  );

  if (!ownsReservation) {
    return {
      ...prevState,
      error: "You can only edit your own reservations",
      success: false,
    };
  }

  const updatedReservation = {
    num_guests: numGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedReservation)
    .eq("id", reservationId);

  if (error) {
    return {
      ...prevState,
      error: "Could not update reservation",
      success: false,
    };
  }

  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId) {
	const session = await auth();
	if (!session) {
		throw new Error("You must be logged in");
	}

	// await new Promise((res) => setTimeout(res, 2000));
	// throw new Error()

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsId = guestBookings.map((booking) => booking.id);

	if (!guestBookingsId.includes(bookingId)) {
		throw new Error("You can only delete your own bookings");
	}

	const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}

	revalidatePath("/account/reservations");
}
