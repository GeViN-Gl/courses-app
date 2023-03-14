/* eslint-disable prettier/prettier */
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { useState, useContext } from 'react';
import { AuthorsContext } from '../../../../helpers/context/authors.context';

const AddAuthor = () => {
  const [inputValue, setInputValue] = useState('');
  const { authorsList, setAuthorsList } = useContext(AuthorsContext);

  const inputHandler = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h3>Add author</h3>
      <div>
        <Input
          labelText='Author name'
          placeholderText='Enter author name...'
          onChange={inputHandler}
          value={inputValue}
        />
        <Button
          onClick={(event) => {
            event.preventDefault();
            if (!inputValue) {
              return;
            }
            const newAuthor = {};
            newAuthor.id = crypto.randomUUID();
            newAuthor.name = inputValue;
            setAuthorsList([...authorsList, newAuthor]);
            setInputValue('');
          }}>
          Create author
        </Button>
      </div>
    </div>
  );
};

export default AddAuthor;
