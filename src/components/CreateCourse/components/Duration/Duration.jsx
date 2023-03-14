import Input from '../../../../common/Input/Input';
import { useContext } from 'react';
import { CreateCourseContext } from '../../../../helpers/context/createCourse.contex';

import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

const Duration = () => {
  // const [_, setInputValue] = useState('');
  const { timeStr, setTimeStr, setTimeNum, timeNum } =
    useContext(CreateCourseContext);

  const inputHandler = (event) => {
    event.preventDefault();
    // just prevent any non number chars )
    if (isNaN(event.target.value)) {
      return;
    }
    // setInputValue(event.target.value);
    const minutes = +event.target.value;
    setTimeNum(minutes);
    setTimeStr(toHoursAndMinutes(minutes));
  };

  return (
    <div>
      <h3>Duration</h3>
      <Input
        labelText='Duration'
        placeholderText='Enter duration in minutes...'
        value={timeNum}
        onChange={inputHandler}
        title='Please enter at least one number'
        required
      />
      <div>Duration: {timeStr} hours</div>
    </div>
  );
};

export default Duration;
