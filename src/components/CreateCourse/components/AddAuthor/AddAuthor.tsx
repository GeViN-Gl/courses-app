/* eslint-disable prettier/prettier */
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { AddAuthorContainer, AddAuthorMiniform } from './AddAuthor.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import { useState, ChangeEvent, MouseEvent, FC } from 'react';

import { useDispatch } from 'react-redux';
import { addAuthorToList } from '../../../../store/authors/actionCreators';

import { Author } from '../../../../store/authors/reducer';
import { AnyAction, Dispatch } from 'redux';

const AddAuthor: FC = () => {
	const [inputValue, setInputValue] = useState('');

	const dispatch: Dispatch<AnyAction> = useDispatch();
	// const authorsList = useSelector(selectAuthorsList);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setInputValue(event.target.value);
	};

	const newAuthorButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!inputValue) {
			return;
		}

		const newAuthor: Author = {
			id: crypto.randomUUID(),
			name: inputValue,
		};

		dispatch(addAuthorToList(newAuthor));

		setInputValue('');
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
