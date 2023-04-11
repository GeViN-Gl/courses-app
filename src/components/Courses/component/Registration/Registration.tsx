import {
	RegistrationContainer,
	RegistrationForm,
	RegistrationFormText,
} from './Registration.styles';

import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { toastNotify } from '../../../../helpers/toastNotify';
import { registerFetchHelper } from '../../../../helpers/fetchHelpers';

type RegistrationFormField = { name: string; email: string; password: string };

const defaultFormFields: RegistrationFormField = {
	name: '',
	email: '',
	password: '',
};

const Registration: FC = () => {
	const [formFields, setFormFields] =
		useState<RegistrationFormField>(defaultFormFields);
	const { name, email, password } = formFields;

	const navigate: NavigateFunction = useNavigate();

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement>) => {
		setFormFields({ ...formFields, [name]: value });
	};

	type SucessfullRegistrationRequest = {
		successful: true;
		result: string;
	};
	function assertSuccessfulRegistrationRequest(
		responcedData: any
	): asserts responcedData is SucessfullRegistrationRequest {
		if (!responcedData.successful) {
			throw new Error('Registration unsuccessful');
		}
	}

	const registrationFethchHandler = async () => {
		try {
			const responsedData = await registerFetchHelper(name, email, password);
			assertSuccessfulRegistrationRequest(responsedData);
			return responsedData.successful;
		} catch (error) {
			console.error(error);
		}
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		registrationFethchHandler().then((successfull) => {
			if (successfull) {
				toastNotify('🤝 Registration Successful');
				resetFormFields();
				navigate('/login');
			}
		});
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
					If you have an account you can <Link to='/login'>Login</Link>
				</RegistrationFormText>
			</RegistrationForm>
		</RegistrationContainer>
	);
};

export default Registration;
