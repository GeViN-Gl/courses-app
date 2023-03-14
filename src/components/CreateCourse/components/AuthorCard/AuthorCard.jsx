/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { CreateCourseContext } from '../../../../helpers/context/createCourse.contex';

import Button from '../../../../common/Button/Button';

const AuthorCard = ({ author, isAdd }) => {
  const {
    notAddedAuthorList,
    addedAuthorList,
    setNotAddedAuthorList,
    setAddedAuthorList,
  } = useContext(CreateCourseContext);

  return (
    <>
      <h4>{author.name}</h4>
      <Button
        onClick={(event) => {
          event.preventDefault();
          // check in notAdded array
          if (
            notAddedAuthorList.some(
              (notAddedAuthor) => notAddedAuthor.id === author.id
            )
          ) {
            // transfer to added
            // 1st find nodAdded
            const authorToTransfer = notAddedAuthorList.find(
              (notAddedAuthor) => notAddedAuthor.id === author.id
            );
            // 2st mutate notAdded to chop
            // create filted
            const newNotAddedAuthorList = notAddedAuthorList.filter(
              (notAddedAuthor) => notAddedAuthor.id !== author.id
            );
            // call setter
            setNotAddedAuthorList(newNotAddedAuthorList);
            // add to added list via spread
            setAddedAuthorList([...addedAuthorList, authorToTransfer]);
          }

          // and vice-verca
          if (
            addedAuthorList.some((addedAuthor) => addedAuthor.id === author.id)
          ) {
            // transfer to NOTadded
            // 1st find in added
            const authorToTransfer = addedAuthorList.find(
              (addedAuthor) => addedAuthor.id === author.id
            );
            // 2st mutate notAdded to chop
            // create filted
            const newAddedAuthorList = addedAuthorList.filter(
              (notAddedAuthor) => notAddedAuthor.id !== author.id
            );
            // call setter
            setAddedAuthorList(newAddedAuthorList);
            // add to added list via spread
            setNotAddedAuthorList([...notAddedAuthorList, authorToTransfer]);
          }
        }}>
        {`${isAdd ? 'Add' : 'Delete'} author`}
      </Button>
    </>
  );
};

export default AuthorCard;
