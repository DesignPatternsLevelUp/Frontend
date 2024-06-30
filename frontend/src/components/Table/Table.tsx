import React, { useState } from "react";
import {
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Input,
	Box,
} from "@chakra-ui/react";

type TableData = {
	id: number;
	name: string;
	description: string;
	// Add more fields as needed
};

type TableProps = {
	data: TableData[];
	hasSearch?: boolean; // Indicates whether the table includes a search bar
};

const Table = ({ data, hasSearch = true }: TableProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Box>
			{hasSearch && (
				<Input
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search..."
					mb={4}
				/>
			)}
			<ChakraTable variant="simple" className="table">
				<TableCaption>Table</TableCaption>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Name</Th>
						<Th>Description</Th>
						{/* Add more headers as needed */}
					</Tr>
				</Thead>
				<Tbody>
					{filteredData.map((item) => (
						<Tr key={item.id}>
							<Td>{item.id}</Td>
							<Td>{item.name}</Td>
							<Td>{item.description}</Td>
							{/* Render more columns as needed */}
						</Tr>
					))}
				</Tbody>
			</ChakraTable>
		</Box>
	);
};

export default Table;
