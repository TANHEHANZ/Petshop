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



export const Section = styled.section`
 width:100%;
 height:100%;
 align-items:start;
 flex-direction:column;
 background-color:${colors.white};
& > h2{
font-size:2em;
margin:2em;
}
& > article{
  ${FlexComun}
  justify-content:start;
  gap:1em;
  padding:2em;
  box-shadow:0px 5px 10px -5px #000;
  margin:0;
 & input{
  width:30em;
  background-color:transparent;
  border:none;
  border-bottom: solid 1px #0005;
  padding:.5em ;
  outline:none;
 }
 & button{
  padding:.5em 2em;
  background-color:${colors.secundary};
  color:${colors.white};
  border:none;
  border-radius:.8em;
  cursor: pointer;
 }
}


`;
export const Table = styled.table`
width:80%;
margin:2em auto;
border-collapse:collapse;
& thead{
  border:solid 1px #0005;
height:3em;
 
}
& tr{
    text-align:center;
    border:solid 1px #0005;
    font-size:.9em;
    & th{
      font-weight:100;
&::first-letter{
  text-transform:uppercase;
}
    }
    & td{
&:last-child{
  ${FlexComun}
  gap:1em;
  padding:.5em;
& button{
  background-color:${colors.primary};
  padding:.3em 1em ;
  border:none;
  color:${colors.white};
}
}
    }
}
`;



export const Filtros = styled.section`
width:220px;
height:14em;
position:fixed;
right:-80px;
top:25%;
background-color:${colors.primary};
color:${colors.white};
display:flex;
flex-direction:column;
align-items:start;
justify-content:start;
padding:1em;
transition:all 1s ease-in-out;
border-radius:.5em;
opacity:.7;
& h2{
  margin:1em .5em;
}
& label{
  & input{
    margin:1em ;
  }
}
&:hover,:active{
  right:-1em;
opacity:1;
}

`;
