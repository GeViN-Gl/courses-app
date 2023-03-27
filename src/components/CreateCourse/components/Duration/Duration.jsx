import Input from '../../../../common/Input/Input';
import { CustomTitle as Title } from '../../../../common/CustomTitle/CustomTitle';
import { DurationContainer, DurationText } from './Duration.styles';

import { useSelector, useDispatch } from 'react-redux';
import {
	selectTimeHours,
	selectTimeMinutes,
} from '../../../../store/create-course/selectors';
import {
	setTimeMinutes,
	setTimeHours,
} from '../../../../store/create-course/actionCreators';

import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Duration = () => {
	const notify = () => toast('Duration accepts only numbers');

	const dispatch = useDispatch();

	const timeHours = useSelector(selectTimeHours);
	const timeMinutes = useSelector(selectTimeMinutes);

	const inputHandler = (event) => {
		event.preventDefault();
		// just prevent any non number chars )
		if (isNaN(event.target.value)) {
			notify();
			return;
		}
		// setInputValue(event.target.value);
		const minutes = +event.target.value;
		dispatch(setTimeMinutes(minutes));
		dispatch(setTimeHours(toHoursAndMinutes(minutes)));
	};

	return (
		<DurationContainer>
			<Title>Duration</Title>
			<Input
				labelText='Duration'
				placeholderText='Enter duration in minutes...'
				// prevent leading 0
				value={timeMinutes === 0 ? '' : timeMinutes}
				onChange={inputHandler}
				title='Please enter at least one number'
				required
			/>
			<DurationText>
				Duration: <span>{timeHours}</span> hours
			</DurationText>
		</DurationContainer>
	);
};

export default Duration;
