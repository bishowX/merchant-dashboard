import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useOrder } from "../../context/order-context";

const initialFormValues = {
	customerName: "",
	customerPhone: "",
	customerAddress: "",
	cost: "",
	status: "",
};

const OrderDetail = () => {
	const {
		state: { orders },
		dispatch,
	} = useOrder();

	const [order, setOrder] = useState(null);

	const router = useRouter();
	const { id } = router.query;

	const [formValues, setFormValues] = useState(initialFormValues);

	const handleFormValueChanged = (event) => {
		const newFormValues = formValues;
		newFormValues[event.target.name] = event.target.value;
		setFormValues({ ...newFormValues });
	};

	const handleUpdateOrder = (event) => {
		event.preventDefault();

		const ordersWithoutCurrentOrder = orders.filter((order) => order.id !== Number(id));
		const updatedOrder = { ...formValues, id };
		const newOrders = [...ordersWithoutCurrentOrder, updatedOrder];
		localStorage.setItem("orders", JSON.stringify([...orders, newOrders]));
		dispatch({ type: "SET_ORDERS", payload: newOrders });
		router.push("/");
	};

	useEffect(() => {
		if (!id) return;
		const filteredOrder = orders.filter((order) => order.id === Number(id))[0];
		console.log(filteredOrder);
		setOrder(filteredOrder);
		setFormValues(filteredOrder);
	}, [id]);

	return (
		<div className="container mx-auto py-8">
			<h1>Order details</h1>
			{!order ? (
				<h1>Order id doesn&apos;t match</h1>
			) : (
				<div className="container mx-auto py-8">
					<form onSubmit={handleUpdateOrder} className="flex flex-col gap-4">
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
							Update Order
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default OrderDetail;
