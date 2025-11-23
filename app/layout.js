import Header from "./_components/Header.js";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		template: "%s / The Wild Oasis",
		default: "Welcome / The Wild Oasis",
	},
	description: "Experience wilderness luxury in our exclusive mountain cabins, where nature and comfort unite",
};

function RootLayout({ children }) {
	return (
		<html>
			<body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}>
				<Header />
				<div className="flex-1 px-8 py-12">
					<main className="max-w-7xl mx-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
export default RootLayout;
