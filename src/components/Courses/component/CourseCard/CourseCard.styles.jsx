import styled from 'styled-components';
export const TitleContainer = styled.div`
  outline: 1px solid red;
  & h2 {
    font-size: 48px;
    line-height: 1em;
  }
`;

export const InfoText = styled.p`
  font-size: 20px;
  & span {
    font-weight: bold;
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-items: start;
  gap: 10px;
  outline: 1px solid green;

  & button {
    justify-self: center;
  }
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: 60% 40%;
  outline: 1px solid black;
  padding: 25px;
`;
