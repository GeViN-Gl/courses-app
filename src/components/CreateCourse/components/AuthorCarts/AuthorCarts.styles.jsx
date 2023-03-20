import styled from 'styled-components';

export const AuthorCardsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	align-items: center;
	justify-content: start;
	row-gap: 10px;

	& > button {
		max-width: fit-content;
	}
`;

export const AllAuthorCards = styled.div`
	& > h3 {
		padding: 25px 0;
	}
`;
