export const generateHash = (value) => {
	let hash = 0,
		i = 0,
		len = value.length;
	while (i < len) {
		hash = ((hash << 5) - hash + value.charCodeAt(i++)) << 0;
	}
	return hash;
};

export const getTotalAmount = (orders) => {
	let total = 0;
	orders.forEach((order) => {
		total += Number(order.cost);
	});
	return total;
};
