import React, { useState } from "react";
import "./TopNav.css";
import DrawerComponent from "../Drawer/Drawer";

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

				<div className="nav-items">
					<span className="user-text">John Doe - Admin</span>
				</div>

				<div className="user-info">
					<button className="logout-button">Logout</button>
				</div>
			</div>
			<DrawerComponent isOpen={isDrawerOpen} onClose={handleDrawerClose} />
		</>
	);
};

export default TopNav;
