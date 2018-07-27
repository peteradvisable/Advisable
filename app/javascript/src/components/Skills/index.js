import React from "react";
import Spacing from "../Spacing";
import styled from "styled-components";

const Skill = styled.div`
  color: #0f3776;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 500;
  margin-right: 10px;
  align-items: center;
  background: #D9E7FF;
  border-radius: 15px;
  display: inline-flex;
  margin-bottom: 10px;
  letter-spacing: -0.015em;
`;

export default ({ skills, ...props }) => {
  return (
    <Spacing {...props}>
      {skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
    </Spacing>
  );
};
