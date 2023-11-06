import { styled } from "styled-components";
import { FlexComun, PositcionComun, colors } from "./styleGlobal";
export const Navbar = styled.nav`
  ${FlexComun}
  height:100vh;
  width: 100vw;
  justify-content: start;
  z-index: 10;

  & a.active {
    background-color: white;
    color: #3068d9;
  }
  & a {
    & > svg {
      width: 30px;
    }
    text-decoration: none;
    padding: 0.7em 1em;
    display: block;
    color: ${colors.white};
    width: 200px;
    font-size: 0.9em;
    border-radius: 12px;
    transition: all 0.2s;
  }
  & svg {
    margin: 0 1em;
  }
  .nav780 {
    display: none;
  }
  & > ul {
    width: 250px;
    background-color: #1877F2;
    height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction:column;
    align-items: start;
    padding-left: 2em;
    box-shadow: 0 5px 10px #000;
    gap: 0.5em;
    & button {
      display: none;
    }
    h1{
      text-align: center;
      width: 85%;
      margin-bottom: 130px;
    color: #fff;
    font-size: 35px;
    border-bottom: 5px solid #fff;

    }
  }
  & li {
    list-style: none;
    position: relative;
   

    /* &::after {
      ${PositcionComun}
      width:8px;
      height: 8px;
      border-radius: 50% ;
      background: ${colors.white};
      left: 0.2em;
      bottom: 1em;
    }
    &::before {
      ${PositcionComun}
      height:100%;
      width: 2px;
      background: ${colors.white};
      left: 0.4em;
      border-radius: 50%;
    } */
  }
  & > div {
    ${FlexComun}
    flex-direction:column;
    height: 100vh;
    width: calc(100vw - 250px);
    /* padding:2em; */
    box-shadow: 0 5px 10px #0005;
  }
  .topnav {
    display: none;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100vw;
    & > div{
      width: 100vw;
    }
    .topnav {
      display: flex;
      flex-direction: row;
      width: 100vw;
      justify-content: space-around;
      height: 10vh;
      & svg {
        padding: 1em;
        background-color: ${colors.primary};
        margin: 0;
        color: ${colors.white};
      }
    }
    .nav780 {
      animation: slideIn 1s forwards;

      & button {
        display: flex;
        position:absolute;
        top:2em;
        right:3em;
        padding: 1em;
      }
      display: flex;
      position: fixed;
      z-index: 100;
      width: 80vw;
    }
    .nav {
      display: none;
    }
  }
`;
