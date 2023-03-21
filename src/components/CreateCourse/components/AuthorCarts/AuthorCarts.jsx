import { useContext } from 'react';
import { CreateCourseContext } from '../../../../helpers/context/createCourse.contex';

import { AuthorCardsContainer, AllAuthorCards } from './AuthorCarts.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import AuthorCard from '../AuthorCard/AuthorCard';

const AuthorCarts = () => {
	const { notAddedAuthorList, addedAuthorList } =
		useContext(CreateCourseContext);

	return (
		<AllAuthorCards>
			<Title>Authors</Title>
			<AuthorCardsContainer>
				{notAddedAuthorList.map((author) => (
					<AuthorCard isAdd={true} key={author.id} author={author} />
				))}
			</AuthorCardsContainer>
			{!notAddedAuthorList.length && <span>Author list is empty</span>}
			<Title>Course authors</Title>
			<AuthorCardsContainer>
				{addedAuthorList.map((author) => (
					<AuthorCard isAdd={false} key={author.id} author={author} />
				))}
			</AuthorCardsContainer>
			{!addedAuthorList.length && <span>Author list is empty</span>}
		</AllAuthorCards>
	);
};

export default AuthorCarts;
