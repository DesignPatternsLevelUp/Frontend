import { Routes, Route } from "react-router-dom";
import CompaniesPage from "./pages/Companies/Companies";
import MarketPage from "./pages/Market/Market";
import InvestorsPage from "./pages/Investors/Investors";
import TradePage from "./pages/Trade/Trade";
import TopNav from "./components/TopNav/TopNav";

const AppRouter = () => {
	return (
		<>
			<TopNav />
			<Routes>
				<Route path="/companies" Component={CompaniesPage} />
				<Route path="/market" Component={MarketPage} />
				<Route path="/investors" Component={InvestorsPage} />\
				<Route path="/trade" Component={TradePage} />
			</Routes>
		</>
	);
};

export default AppRouter;
