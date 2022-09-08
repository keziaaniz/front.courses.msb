import styled from "styled-components";

export const NaV = styled.nav`
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #0a0711;
  }
    
  .dropdown {
    float: left;
    overflow: hidden;
    &:hover {
     display: block;
    };
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgba(10,7,17,0.87);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown&hover .dropdown-content {
  display: block;
}
      
`;

export const Button = styled.a`
  color: #7374d2;
  font-size: 1rem;
  margin: 10px;
  padding: 15px 20px;
  text-decoration: none;
  float: center;
  &:hover {
  color: #ffffff
;
};
`;

export const ButtonDrop = styled.a`
  color: #7374d2;
  font-size: 1rem;
  margin: 10px;
  padding: 15px 20px;
  text-decoration: none;
  display: block;
  text-align: left;
  float: none;

  &:hover {
  color:#ffffff;
};
`;

export const Canva = styled.div`
background-color: rgb(52,165,122);
height: 100%;
padding-left: 20px;
`;

export const Header = styled.div`
margin: 35px;
text-align: center;
`;

export const Row = styled.div`
width: 100%;
display: flex;
padding: 5px;
align-items: center;
font-size: 15px;
align-content: center;
margin-left: 30px;
`;

export const DivIconDisplay = styled.div`
height: 25px;
width: 25px;
margin: 24px;
`;

export const IconDisplay = styled.i`
width: 1rem;
height: 1rem;
color: rgb(245, 245, 220);
fill: rgb(245, 245, 220);
font-size: 1rem;
`;

export const Icon = styled.i`
width: 35px;
height: 55px;
margin-right: 25px;
color: rgb(245, 245, 220);
fill: rgb(245, 245, 220);
font-size: 25px;
`;

export const Logo = styled.img`
  width: 110px;
  height: 110px;
  margin: 0px auto;
  -webkit-filter: drop-shadow(12px 12px 10px #0C0C0C);
  filter: drop-shadow(10px 12px 13px #0C0C0C);
  border-radius: 4px;
  background-color: none;
`;

export const ButtonCanva = styled.a`
  color: rgb(245, 245, 220);
  font-size: 1.2rem;
  margin: 0;
  padding: 0.25em 1em;
  text-decoration: none;
  &:hover {
  color: #605027;
  text-decoration: underline;
}
`;
