import { auth } from "../_lib/auth.js";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service.js";
import DateSelector from "./DateSelector.js";
import LoginMessage from "./LoginMessage.js";
import ReservationForm from "./ReservationForm.js";

export default async function Reservation({ cabin }) {
	const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)]);
	const session = await auth();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 mt-8">
			<DateSelector
				settings={settings}
				cabin={cabin}
				bookedDates={bookedDates}
			/>

			{session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
		</div>
	);
}
