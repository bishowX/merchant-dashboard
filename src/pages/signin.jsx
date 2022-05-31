import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { generateHash } from "../utils";

import { useRouter } from "next/router";
const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { state, dispatch } = useAuth();

	const router = useRouter();

	const handleSignIn = (event) => {
		event.preventDefault();
		const hash = generateHash(`${email}${password}`);
		localStorage.setItem("token", hash);
		dispatch({ type: "LOAD_USER_SUCCESS", payload: hash });
	};

	if (state.token) router.push("/");

	return (
		<div className="container mx-auto h-screen flex justify-center items-center">
			<form onSubmit={handleSignIn} className="w-full max-w-xl flex flex-col gap-4">
				<input
					required
					className="px-4 py-1.5 w-full border-2"
					onChange={(event) => setEmail(event.target.value)}
					value={email}
					name="email"
					type="text"
					placeholder="Email"
				/>
				<input
					required
					className="px-4 py-1.5 w-full border-2"
					onChange={(event) => setPassword(event.target.value)}
					value={password}
					name="password"
					type="password"
					placeholder="Password"
				/>
				<button className="px-4 py-1.5  border-2" type="submit">
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignIn;
