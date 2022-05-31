import { useRouter } from "next/router";
import { useAuth } from "../context/auth-context";

const withAuth = (WrappedComponent) => {
	return (props) => {
		// checks whether we are on client / browser or server.
		if (typeof window !== "undefined") {
			const Router = useRouter();

			const {
				state: { token, loading },
			} = useAuth();

			if (loading) return null;
			if (!token) {
				Router.replace("/signin");
				return null;
			}

			return <WrappedComponent {...props} />;
		}

		// If we are on server, return null
		return null;
	};
};

export default withAuth;
