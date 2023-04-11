import styled, { css } from 'styled-components';
import { CustomInput } from '../../common/Input/Input.styles';

const flexCol = css`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const TitleInput = styled.div`
	${flexCol}
	width: 250px;

	${CustomInput} {
		height: 50px;
	}
`;

export const AddAuthorInput = styled(TitleInput)`
	width: 400px;
`;

export const DescriptionInput = styled.div`
	${flexCol}
	width: 100%;
	/* height: 250px; */
	grid-column: 1 / 3;

	${CustomInput} {
		width: 100%;
		height: 200px;
	}
`;

export const CreateCourseContainer = styled.form`
	padding: 25px;
	border: 1px solid #0000ff;
	min-height: 80vh;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 25px 80px 240px auto;
	align-items: start;

	& > button {
		max-width: fit-content;
		align-self: end;
		justify-self: end;
	}
	& > a {
		grid-column: 1 / 3;
		text-decoration: none;
		padding-bottom: 10px;
	}
`;

export const AddAuthorContainer = styled.div`
	grid-column: 1/3;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
	gap: 25px;
`;

export const AddAuthorBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 15px;
`;

export const CourseAuthorsBox = styled.div``;
