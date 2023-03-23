import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { TitleContainer } from '../../common/CustomTitle/CustomTitle.styles';

export const CourseInfoContainer = styled.section`
	border: 1px solid #0000aa;
	display: grid;
	grid-template-columns: 60% auto;
	grid-template-rows: repeat(3, auto);
	gap: 20px 25px;
	padding: 25px;

	& > ${TitleContainer} {
		grid-column: 1 / -1;
	}
`;

export const GoBackLink = styled(Link)`
	grid-column: 1 / -1;
	text-decoration: none;
`;
export const Description = styled.div`
	padding: 15px 20px;
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 15px 0;
`;

export const InfoField = styled.p`
	display: flex;
	gap: 15px;
	flex-direction: column;

	${({ column }) => `flex-direction: ${column ? 'column' : 'row'};
  ${column && `list-style:none;`}
  `}
`;

export const Key = styled.span`
	font-weight: 600;
`;
