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
	Select,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
} from "@chakra-ui/react";

type Company = {
	id: number;
	name: string;
	shareCode: string;
};

type Investor = {
	id: number;
	name: string;
	shares: number;
};

const CompaniesPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [selectedCompany, setSelectedCompany] = useState<number | null>(1);
	const [newCompanyName, setNewCompanyName] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const companies: Company[] = [
		{ id: 1, name: "Company A", shareCode: "COMP-A" },
		{ id: 2, name: "Company B", shareCode: "COMP-B" },
		{ id: 3, name: "Company C", shareCode: "COMP-C" },
	];

	const investors: Investor[] = [
		{ id: 1, name: "Investor 1", shares: 100 },
		{ id: 2, name: "Investor 2", shares: 50 },
		{ id: 3, name: "Investor 3", shares: 200 },
	];

	const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const companyId = parseInt(event.target.value);
		setSelectedCompany(companyId);
	};

	const handleAddCompany = () => {
		onClose();
	};

	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Companies
			</Heading>
			<Box display="flex" alignItems="center" mb={4}>
				<Select
					placeholder="Select company"
					mr={2}
					onChange={handleCompanyChange}
					value={selectedCompany || ""}
				>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.name}
						</option>
					))}
				</Select>
				<Button colorScheme="teal" onClick={onOpen}>
					Add Company
				</Button>
			</Box>
			{selectedCompany && (
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Investor Name</Th>
							<Th>Shares</Th>
						</Tr>
					</Thead>
					<Tbody>
						{investors
							.filter((investor) => investor.id === selectedCompany)
							.map((investor) => (
								<Tr key={investor.id}>
									<Td>{investor.name}</Td>
									<Td>{investor.shares}</Td>
								</Tr>
							))}
					</Tbody>
				</Table>
			)}

			{/* Modal for adding new company */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New Company</ModalHeader>
					<ModalBody>
						<FormControl>
							<FormLabel>Company Name</FormLabel>
							<Input
								type="text"
								placeholder="Enter company name"
								value={newCompanyName}
								onChange={(e) => setNewCompanyName(e.target.value)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="teal" mr={3} onClick={handleAddCompany}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default CompaniesPage;
