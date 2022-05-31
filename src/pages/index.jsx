import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MerchantDetails from "../components/merchant-details";
import RecentOrders from "../components/recent-orders";
import withAuth from "../components/withAuth";
import { useAuth } from "../context/auth-context";
import { useOrder } from "../context/order-context";
import { getTotalAmount } from "../utils";

const Home = () => {
	const {
		state: { brandName, description, image },
	} = useAuth();

	const {
		state: { orders },
	} = useOrder();

	return (
		<div className="container px-4 mx-auto py-4">
			<MerchantDetails name={brandName} description={description} image={image} />
			<div className="flex text-center gap-4 my-8">
				<div className="p-2  rounded bg-slate-200">
					<h1>Total Orders</h1>
					<p>{orders.length}</p>
				</div>
				<div className="p-2 rounded bg-slate-200">
					<h1>Total Payments</h1>
					<p>Rs. {getTotalAmount(orders)}</p>
				</div>
			</div>

			<Link href="/order">
				<a className="px-2 py-1 bg-indigo-800 text-white rounded">Create Order</a>
			</Link>
			<div className="h-12"></div>
			<RecentOrders orders={orders} />
		</div>
	);
};

export default withAuth(Home);
