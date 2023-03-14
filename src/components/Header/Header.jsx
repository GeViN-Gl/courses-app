import { HeaderContainer, ElementContainer } from './Header.styles';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <ElementContainer>
        <div className='name'>Dave</div>
        <Button buttonType={BUTTON_TYPES_CLASSES.base}>Logout</Button>
      </ElementContainer>
    </HeaderContainer>
  );
};

export default Header;
