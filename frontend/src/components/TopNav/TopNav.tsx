import { useEffect, useState } from "react";
import "./TopNav.css";
import DrawerComponent from "../Drawer/Drawer";
import logo from "../../assets/logo.png";
import { Button } from "@chakra-ui/react";
import { getUserDetails } from "../../services/authentication";

const TopNav = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [email, setEmail] = useState("");
	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	useEffect(() => {
		async function userDetails() {
			const userDetails = await getUserDetails();
			if (!userDetails) {
				setEmail(userDetails.email);
			}
		}
		userDetails();
	}, [sessionStorage]);

	return (
		<>
			<div className="navbar">
				<button
					aria-label="Open Menu"
					className="menu-icon"
					onClick={handleDrawerOpen}
				>
					☰
				</button>

				<div className="navbar-logo">
					<img src={logo} alt="Logo" className="logo-img" />
				</div>

				<div className="nav-items"></div>

				<div className="user-info">
					{email && (
						<span className="user-text">
							<span className="bold-name">{email}</span> -{" "}
							<span className="italic-role">Admin</span>
						</span>
					)}

					<Button colorScheme="teal">Logout</Button>
				</div>
			</div>
			<DrawerComponent isOpen={isDrawerOpen} onClose={handleDrawerClose} />
		</>
	);
};

export default TopNav;
