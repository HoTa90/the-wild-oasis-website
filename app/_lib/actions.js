"use server"

import { signIn } from "./auth.js"

export async function signInAction(){
	await signIn("google", {redirectTo: "/account"})
}