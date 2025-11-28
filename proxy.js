import { auth } from "./app/_lib/auth.js";

export const proxy = auth;

export const config = {
	matcher: ["/account"],
};
