import styled from 'styled-components';
import { CustomInput } from '../../../../common/Input/Input.styles';

export const SearchBarContainer = styled.section`
	display: grid;
	grid-template-columns: 35% 20% 20% auto;
	padding: 15px 0;

	& ${CustomInput} {
		width: 30vw;
		height: 50px;
	}

	& button:last-of-type {
		grid-column: 4 / 5;
	}
`;
