import {
  CardContainer,
  TitleContainer,
  InfoContainer,
  InfoText,
} from './CourseCard.styles';
import Button from '../../../../common/Button/Button';
import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { useContext } from 'react';
import { AuthorsContext } from '../../../../helpers/context/authors.context';

const getStringWithAuthorsNames = (allAuthors, authorsIds, maxStringLength) => {
  const namesArr = [];
  authorsIds.forEach((authorId) => {
    const res = allAuthors.find((authObj) => authObj.id === authorId);
    if (res) {
      namesArr.push(res.name);
    }
  });
  let namesStr = namesArr.join(', ');
  if (namesStr.length > maxStringLength) {
    namesStr = namesStr.slice(0, maxStringLength - 3) + '...';
  }

  return namesStr;
};

const CourseCard = ({ course }) => {
  const { title, description, creationDate, duration, authors } = course;
  const { authorsList } = useContext(AuthorsContext);

  if (!authorsList) {
    console.log(authorsList);
  }

  return (
    <CardContainer>
      <TitleContainer>
        <h2 className='title'>{title}</h2>
        <p className='description'>{description}</p>
      </TitleContainer>
      <InfoContainer>
        <InfoText>
          <span>Authors: </span>
          {getStringWithAuthorsNames(authorsList, authors, 30)}
        </InfoText>
        <InfoText>
          <span>Duration: </span>
          {toHoursAndMinutes(duration)}
        </InfoText>
        <InfoText>
          <span>Created: </span>
          {creationDate}
        </InfoText>
        <Button>Show course</Button>
      </InfoContainer>
    </CardContainer>
  );
};

export default CourseCard;
/*
id: string;
title: string;
description: string;
creationDate: string;
duration: number;
authors: string[];
*/
