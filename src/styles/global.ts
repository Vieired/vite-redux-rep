import { Reset } from "./Reset";
import { createGlobalStyle } from "styled-components";
// import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default createGlobalStyle`
  ${Reset}

  :root {
    --font-title: 1.1rem;
    --font-subtitle: 1rem;
    --font-paragraph: 0.9rem;
    --font-paragraph1: 0.8rem;
    --font-icon: 1.4rem;
    
    --space-x-small: 0.2rem;
    --space-small: 0.5rem;
    --space-medium: 0.8rem;
    --space-large: 1.1rem;
    --space-x-large: 1.7rem;

    --gray0: #2B2B2B;
    --gray1: #313131;
    --gray2: #545456;
    --gray3: #828282;
    --gray4: #A6A8AB;
    --gray5: #BDBDBD;
    --gray6: #E0E0E0;
    --gray7: #F6F6F7;
  }

  /* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;    
  } */

  html, body {
    /* width: 100%; */
    /* height: 100%;
    font-size: var(--font-body-text);
    font-family: 'Couplet', sans-serif;
    font-style: normal;
    font-weight: 400; */

    // Alert
    .react-confirm-alert-overlay {
      background: rgba(0, 0, 0, 0.2);
    }

    // Tooltip
    .__react_component_tooltip {
      max-width: 350px;
      white-space: pre-line;
      font-size: var(--font-paragraph);
      line-height: 1.4rem;
    }

    // Modal
    .ReactModal__Overlay {
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      z-index: 1;
      
      &.ReactModal__Overlay--after-open {
        background-color: rgba(0, 0, 0, 0.75) !important;
      }
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }

    .ReactModal__Content {
      width: 50%;
      border-radius: 10px !important;
      inset: calc(50% + (48px / 2)) auto auto 50% !important;

      @media(max-width: 992px) {
        width: 90%;
      }

      > div {
        height: 100%;
      }

      ul {
        li {
          list-style: none;
        }
      }

      footer {
        small {
          display: flex;
          justify-content: end;
        }
      }
    }
  }
`;
