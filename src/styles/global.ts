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

    /* Color Theme Swatches in Hex */
    
    --Catan-1-hex-dark5: #012432;
    --Catan-1-hex-dark4: #02384E;
    --Catan-1-hex-dark3: #024D6A;
    --Catan-1-hex-dark2: #036186;
    --Catan-1-hex-dark1: #0377A4;
    --Catan-1-hex-ref: #0378A6;
    --Catan-1-hex-light1: #048DC3;
    --Catan-1-hex-light2: #04A1DF;

    --Catan-2-hex-dark5: #2C3201;
    --Catan-2-hex-dark4: #454E02;
    --Catan-2-hex-dark3: #5E6A02;
    --Catan-2-hex-dark2: #778603;
    --Catan-2-hex-dark1: #95A803;
    --Catan-2-hex-ref: #93A603;
    --Catan-2-hex-light1: #ADC304;
    --Catan-2-hex-light2: #C5DF04;

    --Catan-3-hex-dark6: #2D2200;
    --Catan-3-hex-dark5: #493701;
    --Catan-3-hex-dark4: #674E02;
    --Catan-3-hex-dark3: #846303;
    --Catan-3-hex-dark2: #A17903;
    --Catan-3-hex-dark1: #A17A03;
    --Catan-3-hex-ref: #BF9004;
    --Catan-3-hex-light1: #DCA604;

    --Catan-4-hex-dark5: #322101;
    --Catan-4-hex-dark4: #4E3302;
    --Catan-4-hex-dark3: #6A4602;
    --Catan-4-hex-dark2: #865803;
    --Catan-4-hex-dark1: #BE7D04;
    --Catan-4-hex-ref: #BF7E04;
    --Catan-4-hex: #DC9104;

    --Catan-5-hex-dark2: #200303;
    --Catan-5-hex-dark1: #3C0505;
    --Catan-5-hex-ref: #590707;
    --Catan-5-hex-light1: #5B0808;
    --Catan-5-hex-light2: #790B0B;
    --Catan-5-hex-light3: #950D0D;
    --Catan-5-hex-light4: #B11010;
    --Catan-5-hex-light5: #CD1212;

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

    h2, h3 {
      line-height: normal;
    }

    h1 {
      display: block;
      font-size: 2em;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      unicode-bidi: isolate;
    }

    h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      unicode-bidi: isolate;      
    }

    h3 {
      font-size: 1.17em;
      font-weight: 600;
    }

    small {
      font-size: 0.8rem;
    }

    ul {
      margin: 1rem 0;
    }

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
