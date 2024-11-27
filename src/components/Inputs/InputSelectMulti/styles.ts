import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    align-self: start;
    padding: 0 4px 4px 0;
    display: flex;
    column-gap: 8px;

    &.invalid {
      color: red
    }
  }

  > small {
    margin-top: 2px;
    align-self: start;
    text-align: left;
    color: red;
    min-height: 15px;
  }
`;