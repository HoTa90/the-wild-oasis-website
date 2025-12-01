import UpdateReservationForm from "@/app/_components/UpdateReservationForm.js";
import { getBooking, getCabin } from "@/app/_lib/data-service.js";

export default async function Page({ params }) {
	const { reservationId } = await params;
	const reservation = await getBooking(reservationId);
	const cabin = await getCabin(reservation.cabin_id);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">Edit Reservation #{reservationId}</h2>

			<UpdateReservationForm
				reservation={reservation}
				cabin={cabin}
			/>
		</div>
	);
}
