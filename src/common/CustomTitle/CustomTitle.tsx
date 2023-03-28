import { TitleContainer } from './CustomTitle.styles';

import { FC, HTMLAttributes } from 'react';

export type CustomTitleProps = {
	children?: React.ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

export const CustomTitle: FC<CustomTitleProps> = ({
	children,
	...otherProps
}) => {
	return <TitleContainer {...otherProps}>{children}</TitleContainer>;
};
