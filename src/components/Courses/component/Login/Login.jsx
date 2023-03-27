import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	setCurrentUserName,
	setCurrentUserEmail,
	setCurrentUserIsAuth,
	setCurrentUserToken,
} from '../../../../store/user/actionCreators';

import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { postData } from '../../../../helpers/dataFetchers';

const defaultFormFields = {
	name: 'Test',
	email: 'test@example.com',
	password: '123123',
};
const notify = (message) => toast(message);

const Login = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const inputChangeHandler = ({ target: { name, value } }) => {
		setFormFields({ ...formFields, [name]: value });
	};

	const fetchHandler = async () => {
		try {
			const data = await postData('http://127.0.0.1:4000/login', formFields);
			if (data.successful) {
				notify('🟢 Login successful');
				return data;
			}
			if (!data.successful) {
				throw new Error(`Login failed. Reason: ${data.error}`);
			}
		} catch (error) {
			if (error.message.includes('nvalid data')) {
				notify('🛑 Invalid email or password');
			} else {
				notify('🔴 ' + error.message);
				console.error(`Fetch error: ${error.message}`);
			}
		}
	};

	const submitFormHandler = (event) => {
		event.preventDefault();
		fetchHandler().then((data) => {
			if (data) {
				localStorage.setItem('userToken', JSON.stringify(data.result));
				dispatch(setCurrentUserIsAuth(true));
				dispatch(setCurrentUserName(data.user.name));
				dispatch(setCurrentUserEmail(data.user.email));
				dispatch(setCurrentUserToken(data.result));
				navigate('/courses');
				resetFormFields();
			}
		});
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
