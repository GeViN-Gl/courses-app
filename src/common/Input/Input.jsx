import { CustomLabel, CustomInput } from './Input.styles';

const Input = ({
	labelText,
	placeholderText,
	borderColor = '#d4c600',
	isTextArea,
	...otherProps
}) => {
	return (
		<>
			{labelText && <CustomLabel>{labelText}</CustomLabel>}
			<CustomInput
				as={isTextArea ? 'textarea' : 'input'}
				borderColor={borderColor}
				placeholder={placeholderText}
				{...otherProps}
			/>
		</>
	);
};

export default Input;
