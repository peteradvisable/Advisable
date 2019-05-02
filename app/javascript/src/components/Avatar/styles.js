import styled from "styled-components";

const sizes = {
  s: "30px",
  m: "50px",
  l: "90px"
};

const fontSizes = {
  s: '16px',
  m: '17px',
  l: '20px',
}

export const Avatar = styled.div`
  width: ${props => sizes[props.size || "m"]};
  height: ${props => sizes[props.size || "m"]};
  color: ${props => props.url ? "transparent" : "#0064FF"};
  font-size: ${props => fontSizes[props.size || "m"]};;
  font-weight: 500;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  display: inline-flex;
  background-size: cover;
  justify-content: center;
  background-position: center;
  background-color: rgba(0,100,255,0.10);
`;
