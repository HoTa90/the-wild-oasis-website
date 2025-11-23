import Logo from "./_components/Logo.js";
import Navigation from "./_components/Navigation.js";
import "./_styles/globals.css"

import {Josefin_Sans} from "next/font/google"

const josefin = Josefin_Sans({
	subsets: ['latin'],
	display: "swap"
})


export const metadata = {
	title: {
		template: "%s / The Wild Oasis",
		default: "Welcome / The Wild Oasis"
	},
	description: "Experience wilderness luxury in our exclusive mountain cabins, where nature and comfort unite"
};

function RootLayout({ children }) {
	return (
		<html>
			<body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}>
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
				<footer>Copyright by hota</footer>
			</body>
		</html>
	);
}
export default RootLayout;
