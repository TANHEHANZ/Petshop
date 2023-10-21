import { styled } from "styled-components";
import { FlexComun, colors } from "./styleGlobal";
export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  ${FlexComun}
  & form {
    ${FlexComun}
    flex-direction:column;
    width: 40vw;
    height: 30em;
    background-color: ${colors.secundary};
    color: ${colors.primary};
  }
  & div {
    width: 50vw;
  }
`;
