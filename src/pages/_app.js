import { AuthProvider } from "../context/auth-context";
import { OrderProvider } from "../context/order-context";
import "../index.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<OrderProvider>
				<Component {...pageProps} />
			</OrderProvider>
		</AuthProvider>
	);
}

export default MyApp;
