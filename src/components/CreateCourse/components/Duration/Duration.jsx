import Input from '../../../../common/Input/Input';
import { CreateCourseTitle as Title } from '../CreateCourseTitle/CreateCourseTitle';
import { DurationContainer, DurationText } from './Duration.styles';

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
		<DurationContainer>
			<Title>Duration</Title>
			<Input
				labelText='Duration'
				placeholderText='Enter duration in minutes...'
				value={timeNum}
				onChange={inputHandler}
				title='Please enter at least one number'
				required
			/>
			<DurationText>
				Duration: <span>{timeStr}</span> hours
			</DurationText>
		</DurationContainer>
	);
};

export default Duration;
