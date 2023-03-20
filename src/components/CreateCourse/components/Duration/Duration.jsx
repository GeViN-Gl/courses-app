import Input from '../../../../common/Input/Input';
import { CreateCourseTitle as Title } from '../CreateCourseTitle/CreateCourseTitle';
import { DurationContainer, DurationText } from './Duration.styles';

import { useContext } from 'react';
import { CreateCourseContext } from '../../../../helpers/context/createCourse.contex';

import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Duration = () => {
	const notify = () => toast('Duration accepts only numbers');

	const { timeStr, setTimeStr, setTimeNum, timeNum } =
		useContext(CreateCourseContext);

	const inputHandler = (event) => {
		event.preventDefault();
		// just prevent any non number chars )
		if (isNaN(event.target.value)) {
			notify();
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
				// prevent leading 0
				value={timeNum === 0 ? '' : timeNum}
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
