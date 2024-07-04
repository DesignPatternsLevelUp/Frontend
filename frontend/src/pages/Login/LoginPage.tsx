import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { isAuthenticated, setAccessToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LoginPage.css";
export function Login() {
	const redirect_uri = new URL("http://localhost:8000/");
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [busyAuthenticating, setBusyAuthenticating] = useState(false);

	const validateUser = async () => {
		setAuthenticated(await isAuthenticated());
		const queryString = window.location.hash.replace("#", "?");

		if (authenticated) {
			navigate("/company");
		}
		if (queryString && !authenticated && !busyAuthenticating) {
			setBusyAuthenticating(true);
			const params = new URLSearchParams(queryString);
			const accessToken = params.get("access_token");
			await setAccessToken(accessToken, navigate);
		}
	};
	if (authenticated) {
		navigate("/company");
	}

	useEffect(() => {
		validateUser();
	}, []);

	return (
		<Box
			height="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<VStack spacing="4" align="center">
				<Heading>Sign in using cognito</Heading>

				<Button className="signInButton" size="xl">
					<a
						href={`https://stockexchange.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=6adpbancgnmoo945qq0q9nc73s&response_type=token&scope=email+openid&redirect_uri=${redirect_uri}`}
					>
						Sign in
					</a>
				</Button>
			</VStack>
		</Box>
	);
}
