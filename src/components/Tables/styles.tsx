import styled from "styled-components";

export const StylesForm = styled.div`
margin: auto;
width: 50%;
marginTop: 10%;
`;

export const Button = styled.button`
margin: 15px;
color: #090909;
 padding: 0.7em 1.7em;
 font-size: 18px;
 border-radius: 0.5em;
 background: #e8e8e8;
 border: 1px solid #e8e8e8;
 transition: all .3s;
 box-shadow: 6px 6px 12px #c5c5c5,
             -6px -6px 12px #ffffff;
  &:hover { border: 1px solid white;
}
&:active {
  box-shadow: 4px 4px 12px #c5c5c5,
             -4px -4px 12px #ffffff;
}
`;

export const DelButton = styled(Button)`
  color: #f42e0c;
  border-color: #f42e0c;
`;

export const Divider = styled.div`
width: 100%;
background-color: #327ee8f2;
border: 1px solid #327ee8f2;
margin: 10px 0 15px 0;
`;
