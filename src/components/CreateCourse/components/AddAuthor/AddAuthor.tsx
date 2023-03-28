/* eslint-disable prettier/prettier */
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { AddAuthorContainer, AddAuthorMiniform } from './AddAuthor.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import { useState, ChangeEvent, MouseEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorsList } from '../../../../store/authors/selectors';
import { setAuthorsList } from '../../../../store/authors/actionCreators';

import { Author } from '../../../../store/authors/reducer';

const AddAuthor = () => {
	const [inputValue, setInputValue] = useState('');

	const dispatch = useDispatch();
	const authorsList = useSelector(selectAuthorsList);

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

		dispatch(setAuthorsList([...authorsList, newAuthor]));

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
