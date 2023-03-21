import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultFormFields = {
	name: 'Test',
	email: 'test@example.com',
	password: '123123',
};

export const Login = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const fetchHandler = async () => {
		try {
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formFields),
			});
			const data = await response.json();
			if (data.successful) {
				localStorage.setItem('userToken', JSON.stringify(data.result));
			}
		} catch (error) {
			console.error(`Fetch error in Login comp ${error.message}`);
		}
	};

	const submitFormHandler = (event) => {
		event.preventDefault();
		fetchHandler();
	};

	return (
		<LoginContainer>
			<LoginForm onSubmit={submitFormHandler}>
				<CustomTitle>Login</CustomTitle>
				<Input
					labelText='Email'
					placeholderText='Enter email'
					required
					type='email'
					onChange={inputChangeHandler}
					name='email'
					value={email}
				/>
				<Input
					labelText='Password'
					placeholderText='Enter password'
					required
					type='password'
					onChange={inputChangeHandler}
					name='password'
					value={password}
				/>
				<Button>Login</Button>
				<LoginFormText>
					If you not have an account you can{' '}
					<Link to='/registration'>Registration</Link>
				</LoginFormText>
			</LoginForm>
		</LoginContainer>
	);
};
