import {
  CreateCourseContainer,
  TitleInput,
  DescriptionInput,
  AddAuthorContainer,
  AddAuthorBox,
  DurationBox,
  CourseAuthorsBox,
} from './CreateCourse.styles';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorCarts from './components/AuthorCarts/AuthorCarts';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';

import { useContext, useState, useEffect } from 'react';
import { CreateCourseContext } from '../../helpers/context/createCourse.contex';
import { CoursesContext } from '../../helpers/context/courses.context';

const CreateCourse = () => {
  const {
    courseTitle,
    setCourseTitle,
    courseDescription,
    setCourseDescription,
    addedAuthorList,
    timeNum,
    setTimeNum,
    setTimeStr,
    setAddedAuthorList,
  } = useContext(CreateCourseContext);

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString(); // JavaScript months are zero-based, so we need to add 1
    const year = today.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const [isReadyToAddNewCourse, setIsReadyToAddNewCourse] = useState(false);

  //
  const [courseObj, setCourseObj] = useState({
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  });
  // useEffect to regenerate new course object
  useEffect(() => {
    const authorsIdsList = addedAuthorList.map((author) => author.id);

    const newCourseObj = {
      id: crypto.randomUUID(),
      title: courseTitle,
      description: courseDescription,
      creationDate: getCurrentDate(),
      duration: timeNum,
      authors: authorsIdsList,
    };
    setCourseObj(newCourseObj);
  }, [courseTitle, courseDescription, addedAuthorList, timeNum]);

  useEffect(() => {
    if (
      !!courseObj.title &&
      !!courseObj.description &&
      courseObj.authors.length > 0 &&
      courseObj.duration !== 0
    ) {
      setIsReadyToAddNewCourse(true);
    } else {
      setIsReadyToAddNewCourse(false);
    }
  }, [courseObj]);

  const { coursesList, setCoursesList } = useContext(CoursesContext);

  const createCourseButtonHandler = (event) => {
    event.preventDefault();
    if (!isReadyToAddNewCourse) {
      alert('Please fill all fields before creating new course');
      return;
    }
    console.log(courseObj);
    setCoursesList([...coursesList, courseObj]);

    setCourseTitle('');
    setCourseDescription('');
    setAddedAuthorList([]);
    setTimeNum(0);
    setTimeStr('00:00');
  };

  const titleInputHandler = (event) => {
    event.preventDefault();
    setCourseTitle(event.target.value);
    console.log(courseTitle);
  };

  const descriptionInputHandler = (event) => {
    event.preventDefault();
    setCourseDescription(event.target.value);
  };

  return (
    <CreateCourseContainer>
      <TitleInput>
        <Input
          labelText='Title'
          placeholderText='Enter title...'
          onChange={titleInputHandler}
          value={courseTitle}
        />
      </TitleInput>
      <Button onClick={createCourseButtonHandler}>Create course</Button>
      <DescriptionInput>
        <Input
          isTextArea={true}
          labelText='Description'
          placeholderText='Enter description...'
          onChange={descriptionInputHandler}
          value={courseDescription}
        />
      </DescriptionInput>
      <AddAuthorContainer>
        <AddAuthorBox>
          <AddAuthor />
        </AddAuthorBox>
        <DurationBox>
          <Duration />
        </DurationBox>
        <CourseAuthorsBox>
          <AuthorCarts />
        </CourseAuthorsBox>
      </AddAuthorContainer>
    </CreateCourseContainer>
  );
};

export default CreateCourse;
/*
{
  id: string
  title: string
  description: string
  creationDate: string
  duration: number
  authors: [authorId]
  }
  */
