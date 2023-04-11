import styled from 'styled-components';

export const AuthorCardsContainer = styled.div`
	height: 300px;
	overflow-y: scroll;
	overflow-x: hidden;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(auto-fill, 50px);
	align-items: center;
	justify-content: start;
	row-gap: 10px;

	& > button {
		max-width: fit-content;
	}
	& > span {
		grid-column: 1 / -1;
		text-align: center;
	}
`;

export const AllAuthorCards = styled.div`
	& > h3 {
		padding: 25px 0;
	}
`;
