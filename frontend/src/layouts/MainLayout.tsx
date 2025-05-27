import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { StyledWrapper } from "../components/styles/Wrapper.styled";

function MainLayout() {
	return (
		<>
			<StyledWrapper>
				<Navbar />
				<Outlet />
				<Footer />
			</StyledWrapper>
		</>
	);
}

export default MainLayout;
