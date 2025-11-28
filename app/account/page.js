import { auth } from "../_lib/auth.js";

export const metadata = {
	title: "Guest area",
};

async function Page() {
	const data = await auth()
	
  return (
	  <h2 className="font-semibold text-2xl text-accent-400 mb-7">
		Welcome, {data?.user?.name}
      </h2>
  )
}
export default Page