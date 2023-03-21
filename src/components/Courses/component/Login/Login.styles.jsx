import styled from 'styled-components';

export const LoginContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 33%;

	& > input {
		height: 50px;
	}
	& > button {
		max-width: fit-content;
		align-self: center;
	}
`;

export const LoginFormText = styled.p`
	text-align: center;
`;
