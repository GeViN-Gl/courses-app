import { FC } from 'react';
import { LogoSvg } from './Logo.styles';

type LogoProps = {
	alt?: string;
};

const Logo: FC<LogoProps> = () => {
	return <LogoSvg />;
};

export default Logo;
