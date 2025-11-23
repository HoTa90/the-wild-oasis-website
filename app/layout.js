import Logo from "./_components/Logo.js";
import Navigation from "./_components/Navigation.js";
import "./_styles/globals.css"

export const metadata = {
	title: "The Wild Oasis",
};

function RootLayout({ children }) {
	return (
		<html>
			<body>
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
