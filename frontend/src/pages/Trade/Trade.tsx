import React from "react";
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Button,
} from "@chakra-ui/react";
import "./Trade.css";

const Trade = () => {
	const handleCancel = () => {
		// Implement cancel logic here
		console.log("Cancelled");
	};

	const handleConfirm = () => {
		// Implement confirm logic here
		console.log("Confirmed");
	};

	return (
		<Box p={4}>
			<Flex className="tradeForm">
				<FormControl className="tradeFormItem">
					<FormLabel>Stock</FormLabel>
					<Select placeholder="Select stock">
						<option value="stock1">Stock 1</option>
						<option value="stock2">Stock 2</option>
						<option value="stock3">Stock 3</option>
					</Select>
				</FormControl>
				<FormControl className="tradeFormItem">
					<FormLabel>Stock Quantity</FormLabel>
					<Input type="number" placeholder="Enter quantity" />
				</FormControl>
			</Flex>
			<Flex className="tradeForm">
				<FormControl>
					<FormLabel>Stock Value</FormLabel>
					<Input type="number" placeholder="Enter value" />
				</FormControl>
			</Flex>
			<Flex className="tradeForm">
				<FormControl className="tradeFormItem">
					<FormLabel>Buyer</FormLabel>
					<Select placeholder="Select buyer">
						<option value="buyer1">Buyer 1</option>
						<option value="buyer2">Buyer 2</option>
						<option value="buyer3">Buyer 3</option>
					</Select>
				</FormControl>
			</Flex>
			<Flex className="tradeForm">
				<FormControl className="tradeFormItem">
					<FormLabel>Seller</FormLabel>
					<Select placeholder="Select seller">
						<option value="seller1">Seller 1</option>
						<option value="seller2">Seller 2</option>
						<option value="seller3">Seller 3</option>
					</Select>
				</FormControl>
			</Flex>
			<Flex justifyContent="flex-end" mt={4}>
				<Button colorScheme="gray" mr={3} onClick={handleCancel}>
					Cancel
				</Button>
				<button className="confirm-button" onClick={handleConfirm}>
					Confirm
				</button>
			</Flex>
		</Box>
	);
};

export default Trade;
