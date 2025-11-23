import Link from "next/link.js";


export default function Home() {
  return (
	<div>
		<h1>Hello from home</h1>
		<Link href="/cabins">Explore all cabins</Link>
	</div>
  );
}
