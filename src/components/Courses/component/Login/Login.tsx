import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUserToken } from '../../../../store/user/actionCreators';

import { ChangeEvent, FC, FormEvent, useState, MouseEvent } from 'react';

import { toastNotify } from '../../../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';
import { loginFetchHelper } from '../../../../helpers/fetchHelpers';

type LoginFormField = { name: string; email: string; password: string };

const defaultFormFields: LoginFormField = {
	name: '',
	email: '',
	password: '',
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

	type SucessfullLoginRequest = {
		successful: true;
		result: string;
	};
	function assertSuccessfulLoginRequest(
		responcedData: any
	): asserts responcedData is SucessfullLoginRequest {
		if (!responcedData.successful) {
			throw new Error('Login unsuccessful');
		}
	}

	const loginFethcHandler = async () => {
		try {
			const responcedData = await loginFetchHelper(email, password);
			assertSuccessfulLoginRequest(responcedData);
			return responcedData.result;
		} catch (error) {
			console.error(error);
		}
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		loginFethcHandler().then((result) => {
			if (result === undefined) return;
			toastNotify('🤝 Login Successful');
			localStorage.setItem('userToken', JSON.stringify(result));
			dispatch(setCurrentUserToken(result));
			navigate('/courses');
			resetFormFields();
		});
	};

	// Both button handlers are for easy testing, they should`nt be here

	const adminCredHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormFields({
			...formFields,
			email: 'admin@email.com',
			password: 'admin123',
		});
	};
	const userCredHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormFields({
			...formFields,
			email: 'user@email.com',
			password: 'user123',
		});
	};

	return (
		<>
			<button onClick={adminCredHandler}>admin cred</button>
			<button onClick={userCredHandler}>user cred</button>
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
		</>
	);
};
export default Login;
