import styled, { css } from 'styled-components';
import { CustomInput } from '../../../../common/Input/Input.styles';

const flexBoxCol = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const AddAuthorContainer = styled.div`
	${flexBoxCol}/* padding-right: 25px; */
`;

export const AddAuthorMiniform = styled.div`
	${flexBoxCol}
	align-items: flex-start;
	justify-content: center;
	${CustomInput} {
		height: 50px;
		width: 100%;
	}

	& > button {
		max-width: fit-content;
		align-self: center;
	}
`;
