import React, { useState } from "react";
import SharedTable from "../../components/Table/Table";
import { Td } from "@chakra-ui/react";

type Investor = {
	name: string;
	numOfStocks: number;
	valueOfStocks: string;
};
const InvestorsPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const investors: Investor[] = [
		{ name: "John Doe", numOfStocks: 500, valueOfStocks: "R5000" },
		{ name: "Jane Smith", numOfStocks: 1000, valueOfStocks: "R10000" },
	];
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredMarket = investors.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<SharedTable
			title="Investors"
			data={filteredMarket}
			headers={["Stock Name", "Number of Stocks", "Value of Stocks"]}
			renderRow={(item: Investor) => (
				<>
					<Td>{item.name}</Td>
					<Td>{item.numOfStocks}</Td>
					<Td>{item.valueOfStocks}</Td>
				</>
			)}
			searchEnabled={true}
			isDrawerOpen={isDrawerOpen}
		/>
	);
};

export default InvestorsPage;
