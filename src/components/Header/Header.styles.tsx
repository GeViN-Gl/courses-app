import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LogoLinkContainer = styled((props) => <Link {...props} />)`
	outline: 1px solid green;
`;

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #aa0000;
	padding: 25px 40px;

	margin-bottom: 20px;
`;

export const ElementContainer = styled.div`
	display: flex;
	justify-items: flex-end;
	align-items: center;
	gap: 25px;
`;

export const Name = styled.span`
	text-transform: capitalize;
`;
