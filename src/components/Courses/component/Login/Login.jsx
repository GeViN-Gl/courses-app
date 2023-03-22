import { LoginContainer, LoginForm, LoginFormText } from './Login.styles';
import { CustomTitle } from '../../../../common/CustomTitle/CustomTitle';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { Link, useNavigate } from 'react-router-dom';

import { useState, useContext } from 'react';
import { UserContext } from '../../../../helpers/context/user.context';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultFormFields = {
	name: 'Test',
	email: 'test@example.com',
	password: '123123',
};
const notify = (message) => toast(message);

const Login = () => {
	const { setUser, setUserToken } = useContext(UserContext);
	const navigate = useNavigate();

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
				notify('🟢 Login successful');
				return data;
			}
			if (!data.successful || !response.ok) {
				throw new Error(
					`Login failed. Reason: ${data ? data?.result : response.status}`
				);
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
				setUserToken(data.result);
				setUser(data.user);
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
