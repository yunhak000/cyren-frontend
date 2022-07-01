import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-size: 16px;
    background: #EFF5FD;
  }

  .container {
    width: 1200px;
    margin: 0 auto;

    @media screen and (max-width: 1200px) {
      width: 90%;
    }
  }

  button {
    font-size: 16px;
    cursor: pointer;
  }

  textarea {
    resize: none;
  };

  a {
    font-size: 16px;
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyles;
