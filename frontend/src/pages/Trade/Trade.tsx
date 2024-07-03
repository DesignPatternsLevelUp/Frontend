import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Button,
	FormErrorMessage,
} from "@chakra-ui/react";
import "./Trade.css";

const Trade = () => {
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleCancel = () => {
		console.log("Cancelled");
	};

	const [formData, setFormData] = useState({
		stock: "",
		stockQuantity: "",
		stockValue: "",
		buyer: "",
		seller: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateStock = (value: string) => {
		return !!value;
	};

	const validateStockQuantity = (value: string) => {
		return /^\d+$/.test(value);
	};

	const validateStockValue = (value: string) => {
		return !!value;
	};

	const validateBuyer = (value: string) => {
		return !!value;
	};

	const validateSeller = (value: string) => {
		return !!value;
	};

	const [stockValid, setValidStock] = useState(true);
	const [stockQuantityValid, setStockQuantityValid] = useState(true);
	const [stockValueValid, setStockValueValid] = useState(true);
	const [buyerValid, setBuyerValid] = useState(true);
	const [sellerValid, setSellerValid] = useState(true);

	useEffect(() => {
		if (formSubmitted) {
			setValidStock(validateStock(formData.stock));
		}
	}, [formSubmitted, formData.stock]);

	useEffect(() => {
		if (formSubmitted) {
			setStockQuantityValid(validateStockQuantity(formData.stockQuantity));
		}
	}, [formSubmitted, formData.stockQuantity]);

	useEffect(() => {
		if (formSubmitted) {
			setStockValueValid(validateStockValue(formData.stockValue));
		}
	}, [formSubmitted, formData.stockValue]);

	useEffect(() => {
		if (formSubmitted) {
			setBuyerValid(validateBuyer(formData.buyer));
		}
	}, [formSubmitted, formData.buyer]);

	useEffect(() => {
		if (formSubmitted) {
			setSellerValid(validateSeller(formData.seller));
		}
	}, [formSubmitted, formData.seller]);

	const validateForm = () => {
		const formValid =
			stockValid &&
			stockQuantityValid &&
			stockValueValid &&
			buyerValid &&
			sellerValid;
		return formValid;
	};

	const handleConfirm = () => {
		setFormSubmitted(true);
		if (!validateForm()) {
			alert("Please fill out all fields correctly.");
			return;
		}
		console.log("Confirmed");
	};

	return (
		<div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
			<Box p={4}>
				<Flex className="tradeForm">
					<FormControl
						className="tradeFormItem"
						isInvalid={!stockValid && formSubmitted}
					>
						<FormLabel>Stock</FormLabel>
						<Select
							placeholder="Select stock"
							name="stock"
							value={formData.stock}
							onChange={handleInputChange}
						>
							<option value="stock1">Stock 1</option>
							<option value="stock2">Stock 2</option>
							<option value="stock3">Stock 3</option>
						</Select>
						{!stockValid && formSubmitted && (
							<FormErrorMessage>
								Please enter a valid stock quantity.
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl
						className="tradeFormItem"
						isInvalid={!stockQuantityValid && formSubmitted}
					>
						<FormLabel>Stock Quantity</FormLabel>
						<Input
							type="number"
							placeholder="Enter quantity"
							name="stockQuantity"
							value={formData.stockQuantity}
							onChange={handleInputChange}
							readOnly
						/>
						{!stockQuantityValid && formSubmitted && (
							<FormErrorMessage>
								Please enter a valid stock value.
							</FormErrorMessage>
						)}
					</FormControl>
				</Flex>
				<Flex className="tradeForm">
					<FormControl
						className="tradeFormItem"
						isInvalid={!buyerValid && formSubmitted}
					>
						<FormLabel>Buyer</FormLabel>
						<Select
							placeholder="Select buyer"
							name="buyer"
							value={formData.buyer}
							onChange={handleInputChange}
						>
							<option value="buyer1">Buyer 1</option>
							<option value="buyer2">Buyer 2</option>
							<option value="buyer3">Buyer 3</option>
						</Select>
						{!buyerValid && formSubmitted && (
							<FormErrorMessage>Please select a buyer.</FormErrorMessage>
						)}
					</FormControl>
				</Flex>
				<Flex className="tradeForm">
					<FormControl
						className="tradeFormItem"
						isInvalid={!sellerValid && formSubmitted}
					>
						<FormLabel>Seller</FormLabel>
						<Select
							placeholder="Select seller"
							name="seller"
							value={formData.seller}
							onChange={handleInputChange}
						>
							<option value="seller1">Seller 1</option>
							<option value="seller2">Seller 2</option>
							<option value="seller3">Seller 3</option>
						</Select>
						{!sellerValid && formSubmitted && (
							<FormErrorMessage>Please select a seller.</FormErrorMessage>
						)}
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
		</div>
	);
};

export default Trade;
