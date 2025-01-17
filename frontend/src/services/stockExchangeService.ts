import { Business, User, UserStockHoldings } from "../types/types";

const BASE_URL = "https://api.mese.projects.bbdgrad.com";

export async function getAllBusinesses(): Promise<Business[]> {
	try {
		const response = await fetch(`${BASE_URL}/businesses`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch businesses");
		}

		const businesses: { data: Business[] } = await response.json();

		const mappedBusinesses: Business[] = businesses.data.map((business) => ({
			id: business.id,
			name: business.name,
			currentMarketValue: business.currentMarketValue,
		}));

		return mappedBusinesses;
	} catch (error) {
		console.error("Error fetching businesses:", error);
		throw error;
	}
}

export async function getBusinessStockholders(businessId: number) {
	try {
		const response = await fetch(`${BASE_URL}/businesses/${businessId}`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch business stockholders");
		}

		const stockholders = await response.json();
		return stockholders.data;
	} catch (error) {
		console.error("Error fetching business stockholders:", error);
		throw error;
	}
}
export async function getAllUsers(): Promise<User[]> {
	try {
		const response = await fetch(`${BASE_URL}/users`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}

		const users: { data: User[] } = await response.json();
		console.log("hello", response.json());
		const mappedUsers: User[] = users.data.map((user) => ({
			id: user.id,
			bankAccount: user.bankAccount,
		}));

		return mappedUsers;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
}

export async function getUserStockHoldings(
	userId: string
): Promise<UserStockHoldings[]> {
	try {
		const response = await fetch(`${BASE_URL}/users/${userId}`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user stock holdings");
		}

		const stockHoldings: { data: UserStockHoldings[] } = await response.json();
		return stockHoldings.data;
	} catch (error) {
		console.error("Error fetching user stock holdings:", error);
		throw error;
	}
}
