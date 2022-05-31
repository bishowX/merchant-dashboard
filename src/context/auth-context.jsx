import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
const authReducer = (state, action) => {
	switch (action.type) {
		case "LOAD_USER_LOADING":
			return {
				...state,
				loading: true,
				token: null,
			};
		case "LOAD_USER_SUCCESS":
			return {
				...state,
				loading: false,
				token: action.payload,
			};
		case "USER_NOT_LOGGED_IN":
			return {
				...state,
				loading: false,
				token: null,
			};
		default:
			return state;
	}
};

const initialAuthState = {
	token: null,
	loading: false,
	brandName: "Samaya Technologies",
	image: "https://samayama.co/assets/images/logo.svg",
	description:
		"At Samayama, we understand the importance of quick and effortless deliveries at affordable prices. However, we also believe that a brand's delivery experience can have just as much impact as the products themselves. That's why a hassle-free experience and customer delight are at the very heart of every Samayama delivery.",
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialAuthState);

	const value = { state, dispatch };

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) dispatch({ type: "USER_NOT_LOGGED_IN" });
		else dispatch({ type: "LOAD_USER_SUCCESS", payload: token });
	}, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
