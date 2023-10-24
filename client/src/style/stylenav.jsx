import { styled } from "styled-components";
import { FlexComun, PositcionComun, colors } from "./styleGlobal";
export const Navbar = styled.nav`
  ${FlexComun}
  height:100vh;
  width: 100vw;
  justify-content: start;
  & a:active {
    color: ${colors.primary};
  }
  & a {
    text-decoration: none;
    padding: 0.7em 3em;
    display: block;
    color: ${colors.white};
    width: 200px;
    font-size: 0.9em;
  }
  & > ul {
    width: 250px;
    background-color: ${colors.primary};
    height: 100vh;
    ${FlexComun}
    flex-direction:column;
    align-items: start;
    padding-left: 2em;
    box-shadow: 0 5px 10px #000;
  }
  & li {
    list-style: none;
    position: relative;
    &::after {
      ${PositcionComun}
      width:8px;
      height: 8px;
      border-radius: 50% ;
      background: ${colors.white};
      left: 0.2em;
      bottom: 0.8em;
    }
    &::before {
      ${PositcionComun}
      height:100%;
      width: 2px;
      background: ${colors.white};
      left: 0.4em;
      border-radius: 50%;
    }
  }
  & > div{
  ${FlexComun}
  flex-direction:column;
    height:100vh;
    width:calc(100vw - 250px);
    /* padding:2em; */
    
  }
`;
