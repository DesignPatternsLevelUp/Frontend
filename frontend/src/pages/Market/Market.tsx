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
	Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getAllBusinesses } from "../../services/stockExchangeService";
import { isAuthenticated } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

type Business = {
	id: number;
	name: string;
	currentMarketValue: number;
};

type MarketPageProps = {
	isDrawerOpen: boolean;
};

const MarketPage: React.FC<MarketPageProps> = ({ isDrawerOpen }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [businesses, setBusinesses] = useState<Business[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		async function isAuth() {
			let isAuthed = await isAuthenticated()
			if (!isAuthed){
				navigate("/");
			}
		}
		isAuth();
		fetchBusinesses();
	}, []);

	const fetchBusinesses = async () => {
		try {
			setIsLoading(true);
			const businessesData = await getAllBusinesses();
			setBusinesses(businessesData);
		} catch (error) {
			console.error("Error fetching businesses:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredBusinesses = businesses.filter((business) =>
		business.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Market
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
						placeholder="Search market..."
						value={searchTerm}
						onChange={handleSearchChange}
						borderRadius="md"
					/>
				</InputGroup>
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
								<Th>Name</Th>
								<Th>Stock Code</Th>
								<Th>Current Market Value</Th>
							</Tr>
						</Thead>
						<Tbody>
							{filteredBusinesses.map((business, index) => (
								<Tr key={index}>
									<Td>{business.name}</Td>
									<Td>{business.id}</Td>
									<Td>{business.currentMarketValue}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default MarketPage;
