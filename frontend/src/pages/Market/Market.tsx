import { Box, Heading } from "@chakra-ui/react";
import Table from "../../components/Table/Table";

const CompaniesPage = () => {
	return (
		<Box p={4}>
			<Heading size="lg" mb={4}>
				Market
			</Heading>
			<Table data={[]} hasSearch={true} />
		</Box>
	);
};

export default CompaniesPage;
