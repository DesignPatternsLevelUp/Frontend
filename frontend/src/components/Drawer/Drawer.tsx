import { Link, useLocation } from "react-router-dom";
import "./Drawer.css";

type DrawerComponentProps = {
	isOpen: boolean;
	onClose: () => void;
};

const DrawerComponent = ({ isOpen, onClose }: DrawerComponentProps) => {
	const location = useLocation();

	const handleDrawerClose = () => {
		onClose();
	};

	return (
		<div className={`drawer ${isOpen ? "open" : ""}`}>
			<div className="drawer-content">
				<button className="close-button" onClick={handleDrawerClose}>
					<span>&times;</span> {/* Close icon */}
				</button>
				<div className="drawer-items">
					<Link
						to="/companies"
						className={`drawer-item ${
							location.pathname === "/companies" ? "active" : ""
						}`}
					>
						Companies
					</Link>
					<Link
						to="/investors"
						className={`drawer-item ${
							location.pathname === "/investors" ? "active" : ""
						}`}
					>
						Investors
					</Link>
					<Link
						to="/market"
						className={`drawer-item ${
							location.pathname === "/market" ? "active" : ""
						}`}
					>
						Market
					</Link>
					<Link
						to="/trade"
						className={`drawer-item ${
							location.pathname === "/trade" ? "active" : ""
						}`}
					>
						Trade
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DrawerComponent;
