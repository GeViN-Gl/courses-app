import styled from 'styled-components';

export const RegistrationContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const RegistrationForm = styled.form`
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
export const RegistrationFormText = styled.p`
	text-align: center;
`;
