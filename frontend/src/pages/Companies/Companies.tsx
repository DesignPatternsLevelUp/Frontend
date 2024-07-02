import React, { useState } from "react";
import SharedTable from "../../components/Table/Table";
import { Td } from "@chakra-ui/react";

type Companies = {
	investor: string;
	numOfStocks: number;
	valueOfStocks: string;
};

const CompaniesPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const CompaniesData: Companies[] = [
		{ investor: "Investor A", numOfStocks: 100, valueOfStocks: "R5000" },
		{ investor: "Investor B", numOfStocks: 150, valueOfStocks: "R7500" },
		{ investor: "Investor C", numOfStocks: 200, valueOfStocks: "R10000" },
		{ investor: "Investor D", numOfStocks: 50, valueOfStocks: "R2500" },
	];

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredMarket = CompaniesData.filter((item) =>
		item.investor.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
			<SharedTable
				title="Company's"
				data={filteredMarket}
				headers={["Investor", "No. Stocks", "Value of Stocks"]}
				renderRow={(item: Companies) => (
					<>
						<Td>{item.investor}</Td>
						<Td>{item.numOfStocks}</Td>
						<Td>{item.valueOfStocks}</Td>
					</>
				)}
				searchEnabled={true}
				addButtonEnabled={true}
				isDrawerOpen={isDrawerOpen}
			/>
		</div>
	);
};

export default CompaniesPage;
