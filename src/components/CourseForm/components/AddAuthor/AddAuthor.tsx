/* eslint-disable prettier/prettier */
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { AddAuthorContainer, AddAuthorMiniform } from './AddAuthor.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import { useState, ChangeEvent, MouseEvent, FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addAuthorToList } from '../../../../store/authors/actionCreators';

import { AnyAction, Dispatch } from 'redux';
import { sendNewAuthorToAPI } from '../../../../servises';
import { selectCurrentUserToken } from '../../../../store/user/selectors';

const AddAuthor: FC = () => {
	const [inputValue, setInputValue] = useState('');

	const dispatch: Dispatch<AnyAction> = useDispatch();
	const token = useSelector(selectCurrentUserToken);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setInputValue(event.target.value);
	};

	const addAuthorAsyncHandler = async (name: string) => {
		if (!name) return;
		const newAuthorResponce = await sendNewAuthorToAPI(token, name);
		if (newAuthorResponce.successful) return newAuthorResponce.result;
	};

	const newAuthorButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!inputValue) {
			return;
		}

		// change
		// first i just send author name to backend
		// then backend returns both id and name
		// if there are no error i dispatch action to add new author to store
		// in this way state and back will be in sync
		// as this will be async i will need to move this to separate function
		addAuthorAsyncHandler(inputValue)
			.then((newAuthor) => {
				if (newAuthor) {
					dispatch(addAuthorToList(newAuthor));
					setInputValue('');
				}
			})
			.catch((error) => {
				console.error('Error while adding new author:', error);
			});
	};

	return (
		<AddAuthorContainer>
			<Title>Add author</Title>
			<AddAuthorMiniform>
				<Input
					labelText='Author name'
					placeholderText='Enter author name...'
					onChange={inputHandler}
					value={inputValue}
				/>
				<Button onClick={newAuthorButtonHandler}>Create author</Button>
			</AddAuthorMiniform>
		</AddAuthorContainer>
	);
};

export default AddAuthor;
