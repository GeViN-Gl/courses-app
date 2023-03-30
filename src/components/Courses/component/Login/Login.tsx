import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	setCurrentUserName,
	setCurrentUserEmail,
	setCurrentUserIsAuth,
	setCurrentUserToken,
} from '../../../../store/user/actionCreators';

import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { postData } from '../../../../helpers/dataFetchers';
import { toastNotify } from '../../../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';

type LoginFormField = { name: string; email: string; password: string };

const defaultFormFields: LoginFormField = {
	name: 'Test',
	email: 'test@example.com',
	password: '123123',
};

const Login: FC = () => {
	const dispatch: Dispatch<AnyAction> = useDispatch();

	const navigate: NavigateFunction = useNavigate();

	const [formFields, setFormFields] =
		useState<LoginFormField>(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement>) => {
		setFormFields({ ...formFields, [name]: value });
	};

	const fetchHandler = async () => {
		try {
			const data = await postData('http://127.0.0.1:4000/login', formFields);
			if (data.successful) {
				toastNotify('🟢 Login successful');
				return data;
			}
			// Errors
			if (
				!data.successful &&
				data.result &&
				data.result.includes('nvalid data')
			) {
				toastNotify('🛑 Invalid email or password');
				return; // Give user a second chance to reenter the form fields
			}
			if (!data.successful && data.errors) {
				toastNotify(`🛑 Errors: ${data.errors.join(', ')}`);
				return; // Give user a second chance to reenter the form fields
			}
		} catch (error) {
			toastNotify('🔴 Error');
			console.error(`Fetch error: ${error}`);
			throw new Error(`Fetch error: ${error}`);
		}
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		fetchHandler()
			.then((data) => {
				//TODO handle else in task 3
				if (data && data.user && data.result) {
					localStorage.setItem('userToken', JSON.stringify(data.result));
					dispatch(setCurrentUserIsAuth(true));
					dispatch(setCurrentUserName(data.user.name));
					dispatch(setCurrentUserEmail(data.user.email));
					dispatch(setCurrentUserToken(data.result));
					navigate('/courses');
					resetFormFields();
				}
			})
			.catch((error) => console.error(error));
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
export default Login;
