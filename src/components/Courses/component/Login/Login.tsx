import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUserToken } from '../../../../store/user/actionCreators';

import { ChangeEvent, FC, FormEvent, useState, MouseEvent } from 'react';

import {
	FETCH_ACTION_TYPES,
	fetchRequest,
	FetchRequestOptions,
	isFetchSuccess,
	SuccessfulRequest,
} from '../../../../helpers/dataFetchers';
import { toastNotify } from '../../../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';

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

	const fetchHandler = async (): Promise<SuccessfulRequest | null> => {
		try {
			const fetchOptions: FetchRequestOptions = {
				queryData: formFields,
			};
			const data = await fetchRequest(
				'http://127.0.0.1:4000/login',
				FETCH_ACTION_TYPES.POST,
				fetchOptions
			);

			// Success
			if (isFetchSuccess(data)) {
				toastNotify('🟢 Login successful');
				return data;
			}
			// Errors
			if (!isFetchSuccess(data)) {
				if (data.result && data.result.includes('nvalid data')) {
					toastNotify('🛑 Invalid email or password');
					return null; // its form fill errors, report and do nothing
				}
				if (data.result) {
					toastNotify(`🛑 Eroor: ${data.result}`);
					return null; // its form fill errors, report and do nothing
				}
				if (data.errors) {
					toastNotify(`🛑 Errors: ${data.errors.join(', ')}`);
					return null; // its form fill errors, report and do nothing
				}
			}
		} catch (error) {
			toastNotify('🔴 Error');
			console.error(`Fetch error during login: ${error}`);
			throw new Error(`Fetch error during login: ${error}`);
		}
		return null;
	};

	const submitFormHandler = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		type SuccessfulRequestWithUser = SuccessfulRequest & {
			user: { name: string; email: string };
		};
		const isUserExist = (
			data: SuccessfulRequest
		): data is SuccessfulRequestWithUser => !!data.user?.email;

		fetchHandler()
			.then((data) => {
				if (data !== null && isUserExist(data)) {
					localStorage.setItem('userToken', JSON.stringify(data.result));
					dispatch(setCurrentUserToken(data.result));
					navigate('/courses');
					resetFormFields();
				} // else user stays on login form
			})
			.catch((error) => console.error(error));
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
