import Logo from "./_components/Logo.js";
import Navigation from "./_components/Navigation.js";
import "./_styles/globals.css"

export const metadata = {
	title: "The Wild Oasis",
};

function RootLayout({ children }) {
	return (
		<html>
			<body className="bg-primary-950 text-primary-100 min-h-screen">
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
