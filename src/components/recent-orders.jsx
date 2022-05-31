import { useRouter } from "next/router";

const RecentOrders = ({ orders }) => {
	const router = useRouter();
	return (
		<table>
			<thead>
				<tr>
					<th className="py-2 px-2">order id</th>
					<th className="py-2 px-2">Customer Name</th>
					<th className="py-2 px-2">Customer Phone</th>
					<th className="py-2 px-2">Customer Address</th>
					<th className="py-2 px-2">Delivery Cost</th>
					<th className="py-2 px-2">Status</th>
				</tr>
			</thead>
			<tbody>
				{orders?.map((order) => (
					<tr
						key={order.id}
						className="p-2 cursor-pointer even:bg-slate-100 hover:bg-slate-100 even:divide-y-2"
						onClick={() => router.push(`/order/${order.id}`)}
					>
						<td className="py-2 px-2">{order.id}</td>
						<td className="py-2 px-2">{order.customerName}</td>
						<td className="py-2 px-2">{order.customerPhone}</td>
						<td className="py-2 px-2">{order.customerAddress}</td>
						<td className="py-2 px-2">{order.cost}</td>
						<td className="py-2 px-2">{order.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default RecentOrders;
