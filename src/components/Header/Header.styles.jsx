import styled from 'styled-components';
import { LogoSvg } from './components/Logo/Logo.styles';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: 1px solid #aa0000;
  padding: 25px 40px;

  ${LogoSvg} {
    outline: 1px solid green;
  }
`;

export const ElementContainer = styled.div`
  display: flex;
  justify-items: flex-end;
  align-items: center;
  gap: 25px;
`;

export const Name = styled.span`
  text-transform: capitalize;
`;
