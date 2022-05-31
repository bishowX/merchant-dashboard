import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);
const orderReducer = (state, action) => {
	switch (action.type) {
		case "CREATE_ORDER":
			return { ...state, orders: [...state.orders, action.payload] };

		case "SET_ORDERS":
			return { ...state, orders: action.payload };
		default:
			return state;
	}
};

const initialOrderState = {
	orders: [],
};

export const OrderProvider = ({ children }) => {
	const [state, dispatch] = useReducer(orderReducer, initialOrderState);

	const value = { state, dispatch };

	useEffect(() => {
		const orders = localStorage.getItem("orders");
		dispatch({ type: "SET_ORDERS", payload: JSON.parse(orders) || [] });
	}, []);

	return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
