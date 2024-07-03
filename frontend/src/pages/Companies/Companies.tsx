import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	FormControl,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import {
	getAllBusinesses,
	getBusinessStockholders,
} from "../../services/stockExchangeService";

type Business = {
	id: number;
	name: string;
	currentMarketValue: number;
};

type Stockholder = {
	holderId: string;
	holderType: string;
	quantity: number;
	bankAccount: string;
};

const CompaniesPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [businesses, setBusinesses] = useState<Business[]>([]);
	const [stockholders, setStockholders] = useState<Stockholder[]>([]);
	const [selectedBusiness, setSelectedBusiness] = useState<Business>(null);

	useEffect(() => {
		async function fetchBusinesses() {
			try {
				const businessesData = await getAllBusinesses();
				setBusinesses(businessesData);
			} catch (error) {
				console.error("Error fetching businesses:", error);
			}
		}

		fetchBusinesses();
	}, []);

	const handleBusinessSelectChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const id = parseInt(event.target.value);
		const selected = businesses.find((business) => business.id === id);
		setSelectedBusiness(selected);

		try {
			if (selected) {
				const stockholdersData = await getBusinessStockholders(selected.id);
				setStockholders(stockholdersData);
			} else {
				setStockholders([]);
			}
		} catch (error) {
			console.error("Error fetching business stockholders:", error);
			setStockholders([]);
		}
	};

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Companies
			</Heading>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<FormControl ml={4}>
					<FormLabel>Select a Company</FormLabel>
					<Select onChange={handleBusinessSelectChange}>
						<option value="">Select...</option>
						{businesses.map((business: Business) => (
							<option key={business.id} value={business.id}>
								{business.name}
							</option>
						))}
					</Select>
				</FormControl>
			</Box>
			{selectedBusiness && (
				<Box overflowX="auto">
					<Table variant="striped" colorScheme="gray" minWidth="100%">
						<Thead>
							<Tr>
								<Th>Bank Account</Th>
								<Th>Holder Type</Th>
								<Th>Quantity</Th>
							</Tr>
						</Thead>
						<Tbody>
							{stockholders.map((stockholder) => (
								<Tr key={stockholder.holderId}>
									<Td>{stockholder.bankAccount}</Td>
									<Td>{stockholder.holderType}</Td>
									<Td>{stockholder.quantity}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default CompaniesPage;
