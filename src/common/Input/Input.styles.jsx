import styled from 'styled-components';

export const CustomLabel = styled.label`
  font-weight: 500;
`;

export const CustomInput = styled.input`
  font-size: inherit;
  border: 1px solid transparent;
  padding-left: 10px;
  border: 1px solid ${({ borderColor }) => borderColor};

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;
