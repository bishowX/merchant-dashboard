import { useRouter } from "next/router";
import { useState } from "react";
import { useOrder } from "../../context/order-context";

const initialFormValues = {
	customerName: "",
	customerPhone: "",
	customerAddress: "",
	cost: "",
	status: "",
};

const Order = () => {
	const router = useRouter();
	const {
		state: { orders },
		dispatch,
	} = useOrder();
	const [formValues, setFormValues] = useState(initialFormValues);

	const handleFormValueChanged = (event) => {
		const newFormValues = formValues;
		newFormValues[event.target.name] = event.target.value;
		setFormValues({ ...newFormValues });
	};

	const handleCreateOrder = (event) => {
		event.preventDefault();
		const newOrder = { ...formValues, id: Math.round(Math.random() * 10000) };

		localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
		dispatch({ type: "CREATE_ORDER", payload: newOrder });
		router.push("/");
	};

	return (
		<div className="container px-4 mx-auto py-8">
			<form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
				<label htmlFor="customerName">Customer Name</label>
				<input
					onChange={handleFormValueChanged}
					required
					className="px-4 py-1.5 w-full border-2"
					name="customerName"
					type="text"
					value={formValues.customerName}
				/>
				<label htmlFor="customerPhone">Customer Phone</label>
				<input
					onChange={handleFormValueChanged}
					required
					className="px-4 py-1.5 w-full border-2"
					name="customerPhone"
					type="text"
					value={formValues.customerPhone}
				/>
				<label htmlFor="customerAddress">Customer Address</label>
				<input
					onChange={handleFormValueChanged}
					required
					className="px-4 py-1.5 w-full border-2"
					name="customerAddress"
					type="text"
					value={formValues.customerAddress}
				/>
				<label htmlFor="cost">Cost</label>
				<input
					onChange={handleFormValueChanged}
					required
					className="px-4 py-1.5 w-full border-2"
					name="cost"
					type="number"
					value={formValues.cost}
				/>
				<label htmlFor="status">Status</label>
				<input
					onChange={handleFormValueChanged}
					required
					className="px-4 py-1.5 w-full border-2"
					name="status"
					type="text"
					value={formValues.status}
				/>
				<button className="px-2 py-1 bg-indigo-800 text-white rounded" type="submit">
					Create Order
				</button>
			</form>
		</div>
	);
};

export default Order;
