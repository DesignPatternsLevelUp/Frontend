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
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	FormControl,
	FormLabel,
	Input as ChakraInput,
	useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

type Company = {
	id: number;
	name: string;
	shareCode: string;
};

type Investor = {
	id: number;
	name: string;
	shares: number;
	stockValue: number;
};

const InvestorsPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

	const companies: Company[] = [
		{ id: 1, name: "Company A", shareCode: "COMP-A" },
		{ id: 2, name: "Company B", shareCode: "COMP-B" },
		{ id: 3, name: "Company C", shareCode: "COMP-C" },
	];

	const investors: Investor[] = [
		{ id: 1, name: "Investor 1", shares: 100, stockValue: 5000 },
		{ id: 2, name: "Investor 2", shares: 50, stockValue: 2500 },
		{ id: 3, name: "Investor 3", shares: 200, stockValue: 10000 },
	];

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleAddInvestor = (company: Company) => {
		setSelectedCompany(company);
		onOpen();
	};

	const handleModalClose = () => {
		setSelectedCompany(null);
		onClose();
	};

	const handleSaveInvestor = () => {
		onClose();
	};

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Investors
			</Heading>
			<Box display="flex" alignItems="center" mb={4}>
				<InputGroup>
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
				<Button
					leftIcon={<AddIcon />}
					colorScheme="teal"
					ml={4}
					onClick={() => handleAddInvestor(selectedCompany || companies[0])}
				>
					Add Investor
				</Button>
			</Box>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Share Code</Th>
						<Th>Investors</Th>
						<Th>Investor Shares</Th>
						<Th>Stock Value</Th>
					</Tr>
				</Thead>
				<Tbody>
					{filteredCompanies.map((company) => (
						<Tr key={company.id}>
							<Td>{company.name}</Td>
							<Td>{company.shareCode}</Td>
							<Td>
								{investors
									.filter((investor) => investor.id === company.id)
									.map((investor) => (
										<div key={investor.id}>
											{investor.name}
											<br />
										</div>
									))}
							</Td>
							<Td>
								{investors
									.filter((investor) => investor.id === company.id)
									.map((investor) => (
										<div key={investor.id}>
											{investor.shares}
											<br />
										</div>
									))}
							</Td>
							<Td>
								{investors
									.filter((investor) => investor.id === company.id)
									.map((investor) => (
										<div key={investor.id}>
											{investor.stockValue}
											<br />
										</div>
									))}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{/* Modal for adding investor */}
			<Modal isOpen={isOpen} onClose={handleModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Investor for {selectedCompany?.name}</ModalHeader>
					<ModalBody>
						<FormControl>
							<FormLabel>Investor Name</FormLabel>
							<ChakraInput placeholder="Enter investor name" />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Shares</FormLabel>
							<ChakraInput type="number" placeholder="Enter number of shares" />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Stock Value</FormLabel>
							<ChakraInput type="number" placeholder="Enter stock value" />
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" onClick={handleModalClose}>
							Cancel
						</Button>
						<Button colorScheme="teal" ml={3} onClick={handleSaveInvestor}>
							Add Investor
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default InvestorsPage;
