import styled from 'styled-components';
import { BaseButton } from '../../../../common/Button/Button.styles';
export const TitleContainer = styled.div`
	& > h2 {
		font-size: 36px;
		/* line-height: 1em; */
		padding-bottom: 20px;
	}

	& > p {
		text-align: justify;
		hyphens: auto;
		width: 100%;
		word-break: break-all;
	}
`;
type InfoTextProps = {
	isMaxLengthApply?: boolean;
};
export const InfoText = styled.p<InfoTextProps>`
	max-width: 100%;
	font-size: 20px;

	${({ isMaxLengthApply }) => {
		return isMaxLengthApply
			? `
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;`
			: '';
	}}

	& span {
		font-weight: bold;
	}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	gap: 10px;
	& > ${BaseButton} {
		max-width: fit-content;
	}
`;

export const InfoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	justify-items: start;
	gap: 10px;

	& ${ButtonsContainer} {
		justify-self: center;
	}
`;

export const CardContainer = styled.section`
	display: grid;
	grid-template-columns: 60% auto;
	padding: 25px;
	border: 1px solid #00ff00;
	gap: 40px;
	margin-bottom: 25px;

	&:last-child {
		margin-bottom: unset;
	}
`;
