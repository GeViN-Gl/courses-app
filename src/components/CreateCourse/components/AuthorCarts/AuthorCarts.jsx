import { useContext } from 'react';
import { CreateCourseContext } from '../../../../helpers/context/createCourse.contex';

import { AuthorCardsContainer } from './AuthorCarts.styles';

import AuthorCard from '../AuthorCard/AuthorCard';

const AuthorCarts = () => {
  const { notAddedAuthorList, addedAuthorList } =
    useContext(CreateCourseContext);

  return (
    <div>
      <h3>Authors</h3>
      <AuthorCardsContainer>
        {notAddedAuthorList.map((author) => (
          <AuthorCard isAdd={true} key={author.id} author={author} />
        ))}
      </AuthorCardsContainer>
      <h3>Course authors</h3>
      <AuthorCardsContainer>
        {addedAuthorList.map((author) => (
          <AuthorCard isAdd={false} key={author.id} author={author} />
        ))}
      </AuthorCardsContainer>
      {!addedAuthorList.length && <span>Author list is empty</span>}
    </div>
  );
};

export default AuthorCarts;
