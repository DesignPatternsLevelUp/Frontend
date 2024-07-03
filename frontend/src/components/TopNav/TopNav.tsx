import { useState } from "react";
import "./TopNav.css";
import DrawerComponent from "../Drawer/Drawer";
import logo from "../../assets/logo.png";

const TopNav = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

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
					<span className="user-text">
						<span className="bold-name">John Doe</span> -{" "}
						<span className="italic-role">Admin</span>
					</span>

					<button className="logout-button">Logout</button>
				</div>
			</div>
			<DrawerComponent isOpen={isDrawerOpen} onClose={handleDrawerClose} />
		</>
	);
};

export default TopNav;
