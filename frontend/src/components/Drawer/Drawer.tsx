import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Link,
	useColorModeValue,
} from "@chakra-ui/react";

type DrawerComponentProps = {
	isOpen: boolean;
	onClose: () => void;
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({
	isOpen,
	onClose,
}) => {
	const location = useLocation();
	const activeLinkColor = useColorModeValue("teal.500", "teal.300");

	return (
		<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent
				style={{ backgroundColor: "#333", color: "white", width: "300px" }}
			>
				<DrawerCloseButton className="close-button" />
				<DrawerHeader>Menu</DrawerHeader>
				<DrawerBody>
					<Box>
						<Link
							as={RouterLink}
							to="/"
							className={`drawer-item ${
								location.pathname === "/companies" ? "active" : ""
							}`}
							_hover={{ transform: "scale(1.1)" }}
							_active={{ color: activeLinkColor }}
							display="block"
							my={2}
						>
							Companies
						</Link>
						<Link
							as={RouterLink}
							to="/investors"
							className={`drawer-item ${
								location.pathname === "/investors" ? "active" : ""
							}`}
							_hover={{ transform: "scale(1.1)" }}
							_active={{ color: activeLinkColor }}
							display="block"
							my={2}
						>
							Investors
						</Link>
						<Link
							as={RouterLink}
							to="/market"
							className={`drawer-item ${
								location.pathname === "/market" ? "active" : ""
							}`}
							_hover={{ transform: "scale(1.1)" }}
							_active={{ color: activeLinkColor }}
							display="block"
							my={2}
						>
							Market
						</Link>
						{/* <Link
							as={RouterLink}
							to="/trade"
							className={`drawer-item ${
								location.pathname === "/trade" ? "active" : ""
							}`}
							_hover={{ transform: "scale(1.1)" }}
							_active={{ color: activeLinkColor }}
							display="block"
							my={2}
						>
							Trade
						</Link> */}
					</Box>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerComponent;
