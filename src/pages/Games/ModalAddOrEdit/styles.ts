import styled from "styled-components";
import loader from '../../../assets/loader3.gif';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 40px;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  gap: 32px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    display: flex;
    width: 100%;
    justify-content: center;    
    padding: 16px 0 16px 16px;
    font-size: 24px;
    /* color: #000; */
    font-weight: bold;
  }

  button {
    width: 71.89px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:focus-visible {
      outline: dashed #000 1px;
      outline-offset: -16px;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  overflow: auto;
  color: #000;
  /* outline: solid #BDBDBD 1px; */
  gap: 16px;
  height: inherit;

  /* p {
    color: #000;
  } */

  > form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    > div:first-child {
      display: flex;
      align-self: end;

      > label {
        display: inherit;
        align-items: center;
        gap: 1rem;
      }
    }

    &.loading::after {
      content: "";
      position: absolute;
      height: -webkit-fill-available;
      width: -webkit-fill-available;
      left: 0;
      background: url(${loader}) #ffffffab center no-repeat;
      background-size: 5rem; 
      margin-top: -32px;
      margin-bottom: 68px;
      user-select: none;
      pointer-events: visiblestroke;
      transition: .5s;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  padding: 16px 32px 32px;
  /* width: 100%; */
  justify-content: end;

  > div {
    gap: 32px;

    button {
      width: 100px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
`;