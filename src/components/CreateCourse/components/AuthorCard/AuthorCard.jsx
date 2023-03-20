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

  // Define a named function that handles the button click // Render the

  const handleAuthorClick = (event) => {
    // Prevent the default button behavior
    event.preventDefault();

    // Check if the author is in the notAdded list
    const isNotAdded = notAddedAuthorList.some(
      (notAddedAuthor) => notAddedAuthor.id === author.id
    );

    // Check if the author is in the added list
    const isAdded = addedAuthorList.some(
      (addedAuthor) => addedAuthor.id === author.id
    );

    // If the author is in the notAdded list
    if (isNotAdded) {
      // Transfer the author to the added list
      const authorToTransfer = notAddedAuthorList.find(
        (notAddedAuthor) => notAddedAuthor.id === author.id
      );
      const newNotAddedAuthorList = notAddedAuthorList.filter(
        (notAddedAuthor) => notAddedAuthor.id !== author.id
      );
      setNotAddedAuthorList(newNotAddedAuthorList);
      setAddedAuthorList([...addedAuthorList, authorToTransfer]);
    }

    // If the author is in the added list
    if (isAdded) {
      // Transfer the author to the notAdded list
      const authorToTransfer = addedAuthorList.find(
        (addedAuthor) => addedAuthor.id === author.id
      );
      const newAddedAuthorList = addedAuthorList.filter(
        (addedAuthor) => addedAuthor.id !== author.id
      );
      setAddedAuthorList(newAddedAuthorList);
      setNotAddedAuthorList([...notAddedAuthorList, authorToTransfer]);
    }
  };

  return (
    <>
      <h4>{author.name}</h4>
      <Button onClick={handleAuthorClick}>
        {`${isAdd ? 'Add' : 'Delete'} author`}
      </Button>
    </>
  );
};

export default AuthorCard;
