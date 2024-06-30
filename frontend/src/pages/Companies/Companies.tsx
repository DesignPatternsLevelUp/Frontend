import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Table from "../../components/Table/Table";

type CompaniesPageProps = {
	isDrawerOpen: boolean;
};

const CompaniesPage: React.FC<CompaniesPageProps> = ({ isDrawerOpen }) => {
	return (
		<Box p={4} className={`content-area ${isDrawerOpen ? "drawer-open" : ""}`}>
			<Heading size="lg" mb={4}>
				Companies
			</Heading>
			<Table data={[]} hasSearch={true} />
		</Box>
	);
};

export default CompaniesPage;
