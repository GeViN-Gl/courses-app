/* eslint-disable prettier/prettier */
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { AddAuthorContainer, AddAuthorMiniform } from './AddAuthor.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorsList } from '../../../../store/authors/selectors';
import { setAuthorsList } from '../../../../store/authors/actionCreators';

const AddAuthor = () => {
	const [inputValue, setInputValue] = useState('');

	const dispatch = useDispatch();
	const authorsList = useSelector(selectAuthorsList);

	const inputHandler = (event) => {
		event.preventDefault();
		setInputValue(event.target.value);
	};

	const newAuthorButtonHandler = (event) => {
		event.preventDefault();
		if (!inputValue) {
			return;
		}
		const newAuthor = {};
		newAuthor.id = crypto.randomUUID();
		newAuthor.name = inputValue;

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
