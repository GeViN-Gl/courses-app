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

import { ChangeEvent, FC } from 'react';
import { toastNotify } from '../../../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';

const Duration: FC = () => {
	const dispatch: Dispatch<AnyAction> = useDispatch();

	const timeHours = useSelector(selectTimeHours);
	const timeMinutes = useSelector(selectTimeMinutes);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		// just prevent any non number chars )
		if (isNaN(Number(event.target.value))) {
			toastNotify('Duration accepts only numbers');
			return;
		}
		if (Number(event.target.value) > Number.MAX_SAFE_INTEGER) {
			toastNotify(
				'Only elves will live long enough to see the end of the course. Reduce the duration a bit.'
			);
			event.target.value = String(Number.MAX_SAFE_INTEGER);
			return;
		}

		// no NaN at this point
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
