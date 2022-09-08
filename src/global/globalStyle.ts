import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }  
  }
  html {
    height: 100%;
}
body {
    min-height: 100%;
}

  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
`;

export const Container = styled.div`
padding:0;
display: flex;
flex-direction: row;
`;

export const ContainerFluid = styled.div`
padding:0;
height: 100%;
`;

export const AddButton = styled.button`
  margin: 5px;
  padding: 1.0em 1.2em;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.0px;
  font-weight: 400;
  color: rgb(39,96,80);
  background-color: rgba(52, 165, 122, 0.5);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;  
  &:hover {
    background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
&:active {  transform: translateY(-1px);
}

`;

export const CloseModal = styled.button`
  margin: 5px;
  padding: 1.0em 1.2em;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.0px;
  font-weight: 500;
  color: rgb(39,96,80);
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;  
`;

export default GlobalStyle;
