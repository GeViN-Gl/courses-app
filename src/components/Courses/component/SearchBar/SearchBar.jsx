import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterField } from '../../../../store/courses/actionCreators';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { SearchBarContainer } from './SearchBar.styles';

import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const dispatch = useDispatch();

	const [inputFieldValue, setInputFieldValue] = useState('');

	const navigate = useNavigate();

	const addNewCourseNavigateHandler = (event) => {
		event.preventDefault();
		navigate('/courses/add');
	};

	const inputChangeHandler = (event) => {
		event.preventDefault();
		setInputFieldValue(event.target.value);
	};

	const seacrhClickHandler = (event) => {
		event.preventDefault();
		dispatch(setFilterField(inputFieldValue));
	};

	// Reset search result when searchbar is empty
	useEffect(() => {
		if (inputFieldValue === '') {
			dispatch(setFilterField(inputFieldValue));
		}
		// Linter is overreacting about the array of dependencies, no need to put the dispatch there, ignore it
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputFieldValue]);

	return (
		<SearchBarContainer>
			<Input
				labelText=''
				placeholderText='Enter course name or id...'
				type='search'
				onChange={inputChangeHandler}
			/>
			<Button onClick={seacrhClickHandler}>Search</Button>
			<Button onClick={addNewCourseNavigateHandler}>Add new course</Button>
		</SearchBarContainer>
	);
};

export default SearchBar;
