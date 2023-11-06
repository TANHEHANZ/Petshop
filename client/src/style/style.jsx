import { styled } from "styled-components";
import { FlexComun, colors } from "./styleGlobal";
export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  ${FlexComun}
  background-color:${colors.secundary};
  & form {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 28em;
    height: 33em;
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 2em;
    gap: 0.5em;
    border-radius: 1em;
    box-shadow: 0 10px 20px ${colors.back};

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
      color: ${colors.tercery};
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
      color: ${colors.white};
      cursor: pointer;
      overflow: hidden;
      height: 3em;
      width: 10em;
      border-radius: 7px;
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

export const Section = styled.section`
  width: 100%;
  height: 100%;
  align-items: start;
  flex-direction: column;
  background-color: ${colors.white};
 
  & > div {
    width: 75vw;
    height: 50vh;
    overflow-y: scroll;
    margin: 2em auto;
    padding: 1em;
  }
  & > h2 {
    font-size: 2em;
    margin: 2em;
  }
  & > article {
    ${FlexComun}
    justify-content:space-between;
    gap: 1em;
    box-shadow: 0px 5px 10px -5px #000;
    margin: 0;
    padding: 2em 10em;
    & > div {
      ${FlexComun}
      gap:2em;
    }
    & > label {
      position: relative;
      background-color: #d0ccc7;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      z-index: 20;
      width: 100%;

      &::first-letter {
        text-transform: uppercase;
      }
    }
    & input {
      background-color: transparent;
      border: solid 1px #0005;
      padding: 0.5em;
      outline: none;
      width: 100%;
      position: absolute;
      bottom: -23px;
      left: -10px;
    }
    & button {
      padding: 0.5em 1.5em;
      background-color: ${colors.secundary};
      color: ${colors.white};
      border: none;
      border-radius: 0.8em;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1080px) {
    & article{
      flex-direction:column;
      height: 20%;
      & label{
        width: 40em;
        & input{
          width: 30em;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    & article{
      flex-direction:column;
      height: 20%;
      & label{
        width: 40em;
        & input{
          width: 30em;
        }
      }
    }
  }
  @media screen and (max-width: 550px) {
    & article{
      flex-direction:column;
      height: 20%;
      & label{
        width: 20em;
        & input{
          width: 20em;
        }
      }
    }
  }
`;
export const Table = styled.table`
  width: 100%;
  margin: 0em auto;
  border-collapse: collapse;
  & thead {
    border: solid 1px #0005;
    height: 2.5em;
    background-color: ${colors.secundary300};
    & > tr {
    text-align: center;
    border: solid 1px #0005;
    font-size: 0.7em;
    color:${colors.white};
    text-transform:uppercase;
    letter-spacing:2px;
      background-color: ${colors.secundary600};
    box-shadow: 0 5px 5px #0005;

    }
   
  }
  & tr {
    text-align: center;
    border: solid 1px #0005;
    font-size: 0.8em;
    & th {
      font-weight: 100;
      background-color:${colors.secundary300};
      &::first-letter {
        text-transform: uppercase;
      }
    }
    & td {
      &:last-child {
        ${FlexComun}
        gap:1em;
        padding: 0.5em;
        & button {
          background-color: ${colors.primary};
          padding: 0.5em 1em;
          border: none;
          /* color: ${colors.white}; */
          background-color: transparent;
          cursor: pointer;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {

  }
`;

export const Filtros = styled.section`
  width: 220px;
  height: 14em;
  position: fixed;
  right: -80px;
  top: 25%;
  background-color: ${colors.primary};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 1em;
  transition: all 1s ease-in-out;
  border-radius: 0.5em;
  opacity: 0.7;
  & h2 {
    margin: 1em 0.5em;
  }
  & label {
    & input {
      margin: 1em;
    }
  }
  &:hover,
  :active {
    right: -1em;
    opacity: 1;
  }
`;
