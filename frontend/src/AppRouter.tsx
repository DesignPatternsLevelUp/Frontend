import { Routes, Route, useNavigate } from "react-router-dom";
import CompaniesPage from "./pages/Companies/Companies";
import MarketPage from "./pages/Market/Market";
import InvestorsPage from "./pages/Investors/Investors";
import TopNav from "./components/TopNav/TopNav";
import { Login } from "./pages/Login/LoginPage";

const AppRouter = () => {
	return (
		<>
			<TopNav />
			<Routes>
				<Route path="/" Component={Login} />
				<Route path="/company" Component={CompaniesPage} />
				<Route path="/market" Component={MarketPage} />
				<Route path="/investors" Component={InvestorsPage} />
				{/* <Route path="/trade" Component={TradePage} /> */}
			</Routes>
		</>
	);
};

export default AppRouter;
