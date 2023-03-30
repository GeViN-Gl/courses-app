import { BaseButton, InvertedButton } from './Button.styles';

import { FC, ButtonHTMLAttributes } from 'react';

export enum BUTTON_TYPES_CLASSES {
	base = 'base',
	inverted = 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base): typeof BaseButton =>
	({
		[BUTTON_TYPES_CLASSES.base]: BaseButton,
		[BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

export type ButtonProps = {
	children?: React.ReactNode;
	buttonType?: BUTTON_TYPES_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
