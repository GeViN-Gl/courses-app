import styled, { css } from 'styled-components';
import { CustomInput } from '../../../../common/Input/Input.styles';

const flexBoxCol = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DurationContainer = styled.div`
  ${flexBoxCol}
  ${CustomInput} {
    height: 50px;
    width: 100%;
  }
`;

export const DurationText = styled.p`
  font-size: 25px;

  & > span {
    font-weight: 600;
  }
`;
