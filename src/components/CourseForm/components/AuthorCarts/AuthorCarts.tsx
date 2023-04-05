import { useSelector } from 'react-redux';
import {
	selectNotAddedAuthorsList,
	selectAddedAuthorsList,
} from '../../../../store/create-course/selectors';

import { AuthorCardsContainer, AllAuthorCards } from './AuthorCarts.styles';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';

import AuthorCard from '../AuthorCard/AuthorCard';
import { FC } from 'react';

const AuthorCarts: FC = () => {
	const notAddedAuthorsList = useSelector(selectNotAddedAuthorsList);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);
	return (
		<AllAuthorCards>
			<Title>Authors</Title>
			<AuthorCardsContainer>
				{notAddedAuthorsList.map((author) => (
					<AuthorCard isAdd={true} key={author.id} author={author} />
				))}
			</AuthorCardsContainer>
			{!notAddedAuthorsList.length && <span>Author list is empty</span>}
			<Title>Course authors</Title>
			<AuthorCardsContainer>
				{addedAuthorsList.map((author) => (
					<AuthorCard isAdd={false} key={author.id} author={author} />
				))}
			</AuthorCardsContainer>
			{!addedAuthorsList.length && <span>Author list is empty</span>}
		</AllAuthorCards>
	);
};

export default AuthorCarts;
