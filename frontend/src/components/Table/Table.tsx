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
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

type MarketData = {
	stock: string;
	stockCode: string;
	numStocks: number;
	valStocks: string;
};
type Investor = {
	id: number;
	name: string;
	numOfStocks: number;
	valueOfStocks: string;
};

type Companies = {
	investor: string;
	numOfStocks: number;
	valueOfStocks: string;
};

type DataItem = MarketData | Investor | Companies;
type SharedTableProps = {
	title: string;
	data: DataItem[];
	headers: string[];
	renderRow: (item: DataItem) => JSX.Element;
	searchEnabled?: boolean;
	addButtonEnabled?: boolean;
	isDrawerOpen: boolean;
	selectionEnabled?: boolean;
};

const SharedTable: React.FC<SharedTableProps> = ({
	title,
	data,
	headers,
	renderRow,
	searchEnabled = false,
	addButtonEnabled = true,
	isDrawerOpen,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleAddItem = () => {
		onOpen();
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
				{searchEnabled && (
					<InputGroup width={{ base: "100%", md: "90%" }}>
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
				{addButtonEnabled && (
					<Button colorScheme="teal" onClick={handleAddItem}>
						Add {title}
					</Button>
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
									<ChakraInput placeholder="Enter company name" />
								</>
							)}
							{title === "Investors" && (
								<>
									<FormLabel>Investor Name</FormLabel>
									<ChakraInput placeholder="Enter investor name" />
									<FormLabel>Shares</FormLabel>
									<ChakraInput
										type="number"
										placeholder="Enter number of shares"
									/>
									<FormLabel>Stock Value</FormLabel>
									<ChakraInput type="number" placeholder="Enter stock value" />
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
