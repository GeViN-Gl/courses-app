import {
	RegistrationContainer,
	RegistrationForm,
	RegistrationFormText,
} from './Registration.styles';

import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultFormFields = {
	name: 'Test',
	email: 'text@example.com',
	password: '123123',
};
const notify = (message) => toast(message);

const Registration = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { name, email, password } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const fetchHandler = async () => {
		try {
			const response = await fetch('http://127.0.0.1:4000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formFields),
			});
			const data = await response.json();

			if (data.successful) {
				notify('🟢 ' + data.result);
			}

			if (!data.successful || !response.ok) {
				throw new Error(
					`Registration failed. Reason: ${
						data ? data?.errors.join(', ') : response.status
					}`
				);
			}
		} catch (error) {
			notify('🔴 ' + error.message);
			console.error(`Fetch error in Reg comp ${error.message}`);
		}
	};

	const submitFormHandler = (event) => {
		event.preventDefault();
		fetchHandler();
	};

	return (
		<RegistrationContainer>
			<RegistrationForm onSubmit={submitFormHandler}>
				<CustomTitle>Registration</CustomTitle>
				<Input
					labelText='Name'
					placeholderText='Enter name'
					required
					type='text'
					onChange={inputChangeHandler}
					name='name'
					value={name}
				/>
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
				<Button>Registration</Button>
				<RegistrationFormText>
					If you not have an account you can{' '}
					<Link to='/registration'>Login</Link>
				</RegistrationFormText>
			</RegistrationForm>
		</RegistrationContainer>
	);
};

export default Registration;
