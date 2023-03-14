import { useContext, useState } from 'react';
import { CoursesContext } from '../../../../helpers/context/courses.context';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { SearchBarContainer } from './SearchBar.styles';

const SearchBar = () => {
  const { setFilterField } = useContext(CoursesContext);

  const [inputFieldValue, setInputFieldValue] = useState('');

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setInputFieldValue(event.target.value);
  };

  const seacrhClickHandler = (event) => {
    event.preventDefault();
    setFilterField(inputFieldValue);
  };

  return (
    <SearchBarContainer>
      <Input
        labelText=''
        placeholderText='Enter course name or id...'
        type='search'
        onChange={inputChangeHandler}
      />
      <Button onClick={seacrhClickHandler}>Search</Button>
      <Button>Add new course</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
