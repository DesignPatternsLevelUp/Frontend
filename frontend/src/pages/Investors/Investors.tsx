import React, { useState, useEffect } from "react";
import {
	Box,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Select,
	Spinner,
} from "@chakra-ui/react";
import {
	getAllUsers,
	getUserStockHoldings,
} from "../../services/stockExchangeService";
import { User, UserStockHoldings } from "../../types/types";
import { isAuthenticated } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

const InvestorsPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [userStockHoldings, setUserStockHoldings] = useState<
		UserStockHoldings[]
	>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchUsers() {
			try {
				setIsLoading(true);
				const fetchedUsers = await getAllUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setIsLoading(false);
			}
		}
		async function isAuth() {
			let isAuthed = await isAuthenticated();
			if (!isAuthed) {
				navigate("/");
			}
		}
		isAuth();
		fetchUsers();
	}, []);

	useEffect(() => {
		async function fetchUserStockHoldings() {
			if (selectedUserId) {
				try {
					setIsLoading(true);
					const stockHoldings = await getUserStockHoldings(selectedUserId);
					setUserStockHoldings(stockHoldings);
				} catch (error) {
					console.error("Error fetching user stock holdings:", error);
				} finally {
					setIsLoading(false);
				}
			}
		}

		fetchUserStockHoldings();
	}, [selectedUserId]);

	const handleUserSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedUserId(event.target.value);
	};

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Investors
			</Heading>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Select
					placeholder="Select a user"
					value={selectedUserId}
					onChange={handleUserSelectChange}
				>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.id}
						</option>
					))}
				</Select>
			</Box>
			{isLoading ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="50vh"
				>
					<Spinner size="xl" />
				</Box>
			) : (
				<Box overflowX="auto">
					<Table variant="striped" colorScheme="gray" minWidth="100%">
						<Thead>
							<Tr>
								<Th>STOCK CODE</Th>
								<Th>QUANTITY</Th>
								<Th>CURRENT MARKET VALUE</Th>
							</Tr>
						</Thead>
						<Tbody>
							{userStockHoldings.map((holding, index) => (
								<Tr key={index}>
									<Td>{holding.businessId}</Td>
									<Td>{holding.quantity}</Td>
									<Td>{holding.currentMarketValue}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default InvestorsPage;
