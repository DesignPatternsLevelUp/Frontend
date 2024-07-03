// components/Table/Table.tsx

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
	Select,
	useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { getBusinessStockholders } from "../../services/stockExchangeService";

type MarketData = {
	stock: string;
	stockCode: string;
	numStocks: number;
	valStocks: string;
};

type Investor = {
	name: string;
	numOfStocks: number;
	valueOfStocks: string;
};

type Companies = {
	investor: string;
	numOfStocks: number;
	valueOfStocks: string;
};

type Business = {
	id: number;
	name: string;
	currentMarketValue: number;
};

type DataItem = MarketData | Investor | Companies | Business;

type SharedTableProps = {
	title: string;
	data: DataItem[];
	headers: string[];
	renderRow: (item: DataItem) => JSX.Element;
	searchEnabled?: boolean;
	isDrawerOpen: boolean;
	selectionEnabled?: boolean;
};

const SharedTable: React.FC<SharedTableProps> = ({
	title,
	data,
	headers,
	renderRow,
	searchEnabled = false,
	isDrawerOpen,
	selectionEnabled = false,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(
		null
	);
	const [stockholders, setStockholders] = useState<any[]>([]); // Define the type based on API response

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleAddItem = () => {
		onOpen();
	};

	const handleBusinessSelectChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const id = parseInt(event.target.value);
		setSelectedBusinessId(id);

		try {
			const stockholdersData = await getBusinessStockholders(id);
			setStockholders(stockholdersData);
		} catch (error) {
			console.error("Error fetching business stockholders:", error);
			setStockholders([]); // Clear stockholders on error
		}
	};

	const filteredData = data.filter((item) =>
		JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				{title}
			</Heading>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				{searchEnabled && title !== "Companies" && (
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input
							type="text"
							placeholder={`Search ${title.toLowerCase()}...`}
							value={searchTerm}
							onChange={handleSearchChange}
							borderRadius="md"
						/>
					</InputGroup>
				)}

				{title === "Companies" && selectionEnabled && (
					<FormControl ml={4}>
						<FormLabel>Select a Company</FormLabel>
						<Select onChange={handleBusinessSelectChange}>
							<option value="">Select...</option>
							{data.map((business: Business) => (
								<option key={business.id} value={business.id}>
									{business.name}
								</option>
							))}
						</Select>
					</FormControl>
				)}
			</Box>
			<Box overflowX="auto">
				<Table variant="striped" colorScheme="gray" minWidth="100%">
					<Thead>
						<Tr>
							{headers.map((header, index) => (
								<Th key={index}>{header}</Th>
							))}
							{title === "Market" && <Th>Trade</Th>}
						</Tr>
					</Thead>
					<Tbody>
						{filteredData.map((item, index) => (
							<Tr key={index}>
								{renderRow(item)}
								{title === "Market" && (
									<Td>
										<Link to="/trade">
											<Button colorScheme="teal">Trade</Button>
										</Link>
									</Td>
								)}
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New {title}</ModalHeader>
					<ModalBody>
						<FormControl>
							{title === "Companies" && (
								<>
									<FormLabel>Company Name</FormLabel>
									<Input placeholder="Enter company name" />
								</>
							)}
							{title === "Investors" && (
								<>
									<FormLabel>Investor Name</FormLabel>
									<Input placeholder="Enter investor name" />
									<FormLabel>Shares</FormLabel>
									<Input type="number" placeholder="Enter number of shares" />
									<FormLabel>Stock Value</FormLabel>
									<Input type="number" placeholder="Enter stock value" />
								</>
							)}
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
						<Button ml={3} onClick={handleAddItem}>
							Add {title.slice(0, -1)}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default SharedTable;
