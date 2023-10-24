import { styled } from "styled-components";
import { FlexComun, colors } from "./styleGlobal";
export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  ${FlexComun}
  background-color:${colors.primary};
  & form {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    width: 28em;
    height: 33em;
    background-color: ${colors.secundary};
    color: ${colors.white};
    padding: 2em;
    gap: 0.5em;
    border-radius: 1em;
    box-shadow: 0 10px 20px ${colors.secundary};

    & h1 {
      width: 100%;
      text-align: center;
      font-size: 2em;
      margin: 1em 0;
      font-weight: 600;
    }
    & label {
      font-size: 0.8em;
      width: 90%;
      text-align: start;
      color: ${colors.tercery};
    }
    & input {
      width: 100%;
      background-color: transparent;
      border: none;
      border-bottom: solid 1px ${colors.white};
      padding: 1em;
      outline: none;
      color:${colors.tercery};
    }
    & > input:focus {
      border-bottom: solid 1px ${colors.tercery};
    }
    & > button {
      margin: 2em 0;
      text-transform: uppercase;
      background-color: ${colors.secundary};
      border: none;
      position: relative;
      color: ${colors.tercery};
      cursor: pointer;
      overflow: hidden;
      height: 3em;
      width: 10em;
      &::before {
        content: "";
        position: absolute;
        background-color: ${colors.tercery};
        width: 120%;
        height: 120%;
        z-index: -1;
        animation: rotate 2s infinite;
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  & div {
    width: 50vw;
    height: 90vh;
    background-color: #000;
  }
`;
