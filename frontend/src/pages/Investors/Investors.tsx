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
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getAllUsers, User } from "../../services/stockExchangeService";

type Investor = {
	name: string;
	numOfStocks: number;
	valueOfStocks: string;
};

const InvestorsPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [investors, setInvestors] = useState<Investor[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchedInvestors: Investor[] = [
			{ name: "John Doe", numOfStocks: 500, valueOfStocks: "R5000" },
			{ name: "Jane Smith", numOfStocks: 1000, valueOfStocks: "R10000" },
		];
		setInvestors(fetchedInvestors);

		async function fetchUsers() {
			try {
				const fetchedUsers = await getAllUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		}

		fetchUsers();
	}, []);
	console.log(users);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredInvestors = investors.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="gray.300" />
					</InputLeftElement>
					<Input
						type="text"
						placeholder="Search investors..."
						value={searchTerm}
						onChange={handleSearchChange}
						borderRadius="md"
					/>
				</InputGroup>
			</Box>
			<Box overflowX="auto">
				<Table variant="striped" colorScheme="gray" minWidth="100%">
					<Thead>
						<Tr>
							<Th>Investor Name</Th>
							<Th>Number of Stocks</Th>
							<Th>Value of Stocks</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredInvestors.map((investor, index) => (
							<Tr key={index}>
								<Td>{investor.name}</Td>
								<Td>{investor.numOfStocks}</Td>
								<Td>{investor.valueOfStocks}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default InvestorsPage;
