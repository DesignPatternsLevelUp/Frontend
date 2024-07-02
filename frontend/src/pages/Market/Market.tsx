import React, { useState } from "react";
import SharedTable from "../../components/Table/Table";
import { Td } from "@chakra-ui/react";

type MarketData = {
	stock: string;
	stockCode: string;
	numStocks: number;
	valStocks: string;
};

const MarketPage = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const marketData: MarketData[] = [
		{
			stock: "Central Revenue Service",
			stockCode: "CRA",
			numStocks: 10000,
			valStocks: "R100000",
		},
		{
			stock: "Northern Energy",
			stockCode: "NE",
			numStocks: 5000,
			valStocks: "R50000",
		},
		{
			stock: "Central Revenue Service",
			stockCode: "CRA",
			numStocks: 10000,
			valStocks: "R100000",
		},
		{
			stock: "Northern Energy",
			stockCode: "NE",
			numStocks: 5000,
			valStocks: "R50000",
		},
		{
			stock: "Central Revenue Service",
			stockCode: "CRA",
			numStocks: 10000,
			valStocks: "R100000",
		},
		{
			stock: "Northern Energy",
			stockCode: "NE",
			numStocks: 5000,
			valStocks: "R50000",
		},
	];

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredMarket = marketData.filter((item) =>
		item.stock.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
			<SharedTable
				title="Market"
				data={filteredMarket}
				headers={[
					"Stock Name",
					"Stock Code",
					"Number of Stocks",
					"Value of Stocks",
				]}
				renderRow={(item: MarketData) => (
					<>
						<Td>{item.stock}</Td>
						<Td>{item.stockCode}</Td>
						<Td>{item.numStocks}</Td>
						<Td>{item.valStocks}</Td>
					</>
				)}
				searchEnabled={true}
				addButtonEnabled={false}
				isDrawerOpen={isDrawerOpen}
			/>
		</div>
	);
};

export default MarketPage;
