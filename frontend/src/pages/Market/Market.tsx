import React, { useState } from "react";
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

type Company = {
	id: number;
	name: string;
	shareCode: string;
};

const MarketPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	// Mock data for companies
	const [searchTerm, setSearchTerm] = useState("");
	const companies: Company[] = [
		{ id: 1, name: "Company A", shareCode: "COMP-A" },
		{ id: 2, name: "Company B", shareCode: "COMP-B" },
		{ id: 3, name: "Company C", shareCode: "COMP-C" },
	];

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Market
			</Heading>
			<InputGroup mb={4} width="100%">
				<InputLeftElement pointerEvents="none">
					<SearchIcon color="gray.300" />
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Search by company name..."
					value={searchTerm}
					onChange={handleSearchChange}
					borderRadius="md"
				/>
			</InputGroup>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Name</Th>
						<Th>Share Code</Th>
					</Tr>
				</Thead>
				<Tbody>
					{filteredCompanies.map((company) => (
						<Tr key={company.id}>
							<Td>{company.id}</Td>
							<Td>{company.name}</Td>
							<Td>{company.shareCode}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default MarketPage;
