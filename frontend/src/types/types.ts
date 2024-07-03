export type Business = {
	id: number;
	name: string;
	currentMarketValue: number;
};

export type Stockholder = {
	bankAccount: string;
	quantity: string;
	holderType: "COMPANY" | "USER";
};

export type User = {
	userID: string;
};
