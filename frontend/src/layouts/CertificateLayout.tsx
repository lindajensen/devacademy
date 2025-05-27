import { Outlet } from "react-router-dom";

import { StyledCertificateWrapper } from "../components/styles/CertificatePage.styled";

function CertificateLayout() {
	return (
		<>
			<StyledCertificateWrapper>
				<Outlet />
			</StyledCertificateWrapper>
		</>
	);
}

export default CertificateLayout;
